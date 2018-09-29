import ApplicationServerSocket from './ApplicationServerSocket';
import LuffyWebService from '../web-service/LuffyWebService';
import { Subject, Subscription } from 'rxjs';
import DailyTimeSeries from '../daily-time/DailyTimeSeries';
import AlphaVantageProxy from './../http/AlphaVantageProxy';
import PausableInterval from './PausableInterval';
import LuffyRequestParser from './LuffyRequestParser';
import { LuffySocketRequest, LuffySocketResponse } from './LuffySocketUtils';

const DEFAULT_BASIC_MSG_KEYWORD: string = 'message';
const DEFAULT_LUFFY_MSG_KEYWORD: string = 'luffy-message';
const NUMBER_OF_REQUEST_PER_MINUTE: number = 4;

class LuffyServerSocket extends ApplicationServerSocket {
  public requestParser: LuffyRequestParser;

  constructor(public webService: LuffyWebService) {
    super();
    this.requestParser = new LuffyRequestParser();
  }

  start() {
    this.createSocketFromServer(this.webService.server);
    this.onConnect().subscribe(this.onClientSocketConnected.bind(this), onError);

    function onError(err: any) {
      throw new Error(`Error on connecting to the server socket ${err}`);
    }
  }

  onClientSocketConnected(socketInstance: SocketIO.Socket) {
    this.setupMessageParser(socketInstance);
    this.sendCommonMessage(socketInstance, 'message');
  }

  setupMessageParser(socketInstance: SocketIO.Socket): void {
    socketInstance.on(DEFAULT_BASIC_MSG_KEYWORD, (data: any) => {
      console.log('Received message', data);
    });
    socketInstance.on(DEFAULT_LUFFY_MSG_KEYWORD, this.parseLuffyMessage.bind(this, socketInstance));
  }

  parseLuffyMessage(socketInstance: SocketIO.Socket, data: LuffySocketRequest): void {
    console.log('Received luffy-message with data', data);
    if (!this.requestParser.isRequestActionValid(data)) {
      throw new Error('You must specify an action property for this kind of message');
    }

    const symbolsToRequest: string[] = this.requestParser.parseRequest(data);
    if (symbolsToRequest.length) {
      this.processResponse(symbolsToRequest, socketInstance);
    } else {
      this.sendLuffyMessage(socketInstance, { error: { message: 'Your query produced no results' } });
    }
  }

  processResponse(symbolsToRequest: string[], socketInstance: SocketIO.Socket): void {
    const instance: any = this;
    const firstRequestSymbols: string[] = symbolsToRequest.slice(0, NUMBER_OF_REQUEST_PER_MINUTE);
    this.getAndSendData(socketInstance, firstRequestSymbols, symbolsToRequest.length <= NUMBER_OF_REQUEST_PER_MINUTE);

    let startingIndex: number = NUMBER_OF_REQUEST_PER_MINUTE;
    let subscription: Subscription | undefined;
    if (symbolsToRequest.length > NUMBER_OF_REQUEST_PER_MINUTE) {
      const pausableInterval: PausableInterval = new PausableInterval(1000 * 60, 10000, socketInstance);
      subscription = pausableInterval.observable.subscribe(onSubscribe.bind(this, pausableInterval.pauser), onError);
      pausableInterval.pauser.next(false);
    }

    socketInstance.on('disconnect', () => {
      if (subscription) {
        console.log('Unsubscribing the connection to socket', socketInstance.id);
        subscription.unsubscribe();
      }
    });

    function onSubscribe(pauser: Subject<boolean>) {
      const finalIndex: number = startingIndex + 4;
      const symbols: string[] = symbolsToRequest.slice(startingIndex, finalIndex);
      pauser.next(true);
      if (symbols.length) {
        instance.getAndSendData(socketInstance, symbols, finalIndex >= symbolsToRequest.length, pauser);
        startingIndex += 4;
      } else {
        pauser.complete();
        pauser.unsubscribe();
        if (subscription) {
          subscription.unsubscribe();
        }
      }
    }

    function onError(err: any) {
      throw new Error(`Error on the pausable interval ${err}`);
    }
  }

  getAndSendData(socketInstance: SocketIO.Socket, symbols: string[], finished: boolean = false, pauser?: Subject<boolean>): void {
    const instance: any = this;
    const alphaVantageProxy: AlphaVantageProxy = new AlphaVantageProxy();
    alphaVantageProxy.getDailyPricesBySymbols(symbols).subscribe(onSubscribe, onError);

    function onSubscribe(results: DailyTimeSeries[]) {
      results.forEach(onEachDailyTimeSerie);
      if (pauser) pauser.next(false);
    }

    function onEachDailyTimeSerie(dailyTimeSerie: DailyTimeSeries, index: number) {
      const isLast = index === symbols.length - 1 && finished ? true : false;
      if (dailyTimeSerie.getPriceChangeByPeriod().length === 0) {
        console.log('This symbol request returned empty values', dailyTimeSerie.symbol);
      }
      console.log('Sending data to the following socket', socketInstance.id);
      instance.sendLuffyMessage(socketInstance, {
        isLast,
        data: {
          symbol: dailyTimeSerie.symbol,
          lastMovement: dailyTimeSerie.getLastMovement(),
          priceChange: dailyTimeSerie.getPriceChangeByPeriod(),
          trend: dailyTimeSerie.getTrendByPeriod()
        }
      });
    }

    function onError(err: any) {
      throw new Error(`Error on getting the daily prices by symbols ${err}`);
    }
  }

  sendCommonMessage(socketInstance: SocketIO.Socket, data: any): void {
    this.send(socketInstance, 'message', data);
  }

  sendLuffyMessage(socketInstance: SocketIO.Socket, data: LuffySocketResponse): void {
    this.send(socketInstance, 'luffy-message', data);
  }
}

export default LuffyServerSocket;
