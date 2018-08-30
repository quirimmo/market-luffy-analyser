import ApplicationServerSocket from './ApplicationServerSocket';
import LuffyWebService from './LuffyWebService';
import { Subject, Observable, Observer } from 'rxjs';
import DailyTimeSeries from './DailyTimeSeries';
import AlphaVantageProxy from './AlphaVantageProxy';
import PausableInterval from './PausableInterval';
import LuffyRequestParser from './LuffyRequestParser';
import { LuffySocketRequest, LuffySocketResponse } from './LuffySocketUtils';
import { takeUntil } from 'rxjs/operators';

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
    this.onConnect().subscribe(this.onClientSocketConnected.bind(this));
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
    this.getAndSendData(socketInstance, firstRequestSymbols);

    let startingIndex: number = NUMBER_OF_REQUEST_PER_MINUTE;
    if (symbolsToRequest.length > NUMBER_OF_REQUEST_PER_MINUTE) {
      const pausableInterval: PausableInterval = new PausableInterval(1000 * 60, 10000);
      pausableInterval.observable.subscribe(onSubscribe.bind(this, pausableInterval.pauser));
      pausableInterval.pauser.next(false);
    }

    function onSubscribe(pauser: Subject<boolean>) {
      const symbols: string[] = symbolsToRequest.slice(startingIndex, startingIndex + 4);
      pauser.next(true);
      if (symbols.length) {
        instance.getAndSendData(socketInstance, symbols, pauser);
        startingIndex += 4;
      } else {
        pauser.complete();
        pauser.unsubscribe();
      }
    }
  }

  getAndSendData(socketInstance: SocketIO.Socket, symbols: string[], pauser?: Subject<boolean>): void {
    const instance: any = this;
    const alphaVantageProxy: AlphaVantageProxy = new AlphaVantageProxy();
    alphaVantageProxy.getDailyPricesBySymbols(symbols).subscribe(onSubscribe);

    function onSubscribe(results: DailyTimeSeries[]) {
      results.forEach(onEachDailyTimeSerie);
      if (pauser) pauser.next(false);
    }

    function onEachDailyTimeSerie(dailyTimeSerie: DailyTimeSeries) {
      if (dailyTimeSerie.getPriceChangeByPeriod().length === 0) {
        console.log('This symbol request returned empty values', dailyTimeSerie.symbol);
      }
      instance.sendLuffyMessage(socketInstance, {
        data: {
          symbol: dailyTimeSerie.symbol,
          lastMovement: dailyTimeSerie.getLastMovement(),
          priceChange: dailyTimeSerie.getPriceChangeByPeriod(),
          trend: dailyTimeSerie.getTrendByPeriod()
        }
      });
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
