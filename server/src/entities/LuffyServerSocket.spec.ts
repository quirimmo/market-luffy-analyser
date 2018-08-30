import { of, Subject } from 'rxjs';
import DailyTimeSeries from './DailyTimeSeries';
import DailyTime from './DailyTime';

const input: DailyTime[] = [
  new DailyTime('2018-08-16', {
    '1. open': '60.00',
    '2. high': '70.00',
    '3. low': '80.00',
    '4. close': '100.00',
    '5. volume': '100.00'
  }),
  new DailyTime('2018-08-15', {
    '1. open': '10.00',
    '2. high': '20.00',
    '3. low': '30.00',
    '4. close': '40.00',
    '5. volume': '50.00'
  })
];
const results: DailyTimeSeries[] = [new DailyTimeSeries('FB', input)];

const mockGetDailyPricesBySymbols = jest.fn((symbols: string[]) => {
  return of(results);
});

jest.mock('./AlphaVantageProxy', () => () => ({
  getDailyPricesBySymbols: mockGetDailyPricesBySymbols
}));

import LuffyServerSocket from './LuffyServerSocket';
import LuffyWebService from './LuffyWebService';
import PausableInterval from './PausableInterval';

const webService: LuffyWebService = new LuffyWebService();
const instance: LuffyServerSocket = new LuffyServerSocket(webService);

describe('Luffy Server Socket', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(LuffyServerSocket).toBeDefined();
  });

  it('should instantiate an instance of the LuffyServerSocket class', () => {
    expect(instance instanceof LuffyServerSocket).toBeTruthy();
  });

  it('should define the exposed methods', () => {
    expect(typeof instance.start).toEqual('function');
    expect(typeof instance.onClientSocketConnected).toEqual('function');
    expect(typeof instance.setupMessageParser).toEqual('function');
    expect(typeof instance.parseLuffyMessage).toEqual('function');
    expect(typeof instance.processResponse).toEqual('function');
    expect(typeof instance.getAndSendData).toEqual('function');
    expect(typeof instance.sendCommonMessage).toEqual('function');
    expect(typeof instance.sendLuffyMessage).toEqual('function');
  });

  describe('start', () => {
    it('should throw an error if the socket has not started', () => {
      expect(instance.start).toThrow();
    });

    it('should call the createSocketFromServer method', () => {
      instance.start();
      spyOn(instance, 'createSocketFromServer');
      instance.start();
      expect(instance.createSocketFromServer).toHaveBeenCalled();
    });

    it('should call the onConnect method', () => {
      instance.start();
      spyOn(instance, 'onConnect').and.returnValue(of(null));
      instance.start();
      expect(instance.onConnect).toHaveBeenCalled();
    });
  });

  describe('onClientSocketConnected', () => {
    const socketInstance: any = {};

    beforeEach(() => {
      spyOn(instance, 'setupMessageParser').and.callFake(() => {});
      spyOn(instance, 'sendCommonMessage').and.callFake(() => {});
    });

    it('expect setupMessageParser method to have been called with the right parameter', () => {
      instance.onClientSocketConnected(socketInstance);
      expect(instance.setupMessageParser).toHaveBeenCalledWith(socketInstance);
    });

    it('expect sendCommonMessage method to have been called with the right parameter', () => {
      instance.onClientSocketConnected(socketInstance);
      expect(instance.sendCommonMessage).toHaveBeenCalledWith(socketInstance, 'message');
    });
  });

  describe('setupMessageParser', () => {
    const socketInstance: any = { on: jest.fn() };

    it('expect on method of socketInstance to have been called with the right parameters the right number of times', () => {
      instance.setupMessageParser(socketInstance);
      expect(socketInstance.on).toHaveBeenCalledTimes(2);
      expect(socketInstance.on).toHaveBeenCalledWith('message', expect.any(Function));
      expect(socketInstance.on).toHaveBeenCalledWith('luffy-message', expect.any(Function));
    });
  });

  describe('parseLuffyMessage', () => {
    const data: any = {};
    const socketInstance: any = {};

    it('should call the isRequestActionValid method of the request parser', () => {
      spyOn(instance.requestParser, 'parseRequest').and.returnValue(['SYMB1', 'SYMB2', 'SYMB3']);
      spyOn(instance.requestParser, 'isRequestActionValid').and.returnValue(true);
      instance.parseLuffyMessage(socketInstance, data);
      expect(instance.requestParser.isRequestActionValid).toHaveBeenCalled();
    });

    it('should throw an error of invalid action parameter passed in', () => {
      spyOn(instance.requestParser, 'parseRequest').and.returnValue(['SYMB1', 'SYMB2', 'SYMB3']);
      spyOn(instance.requestParser, 'isRequestActionValid').and.returnValue(false);
      expect(instance.parseLuffyMessage.bind(instance, socketInstance, data)).toThrow(
        'You must specify an action property for this kind of message'
      );
    });

    it('should call the parseRequest method of requestParser', () => {
      spyOn(instance.requestParser, 'isRequestActionValid').and.returnValue(true);
      spyOn(instance.requestParser, 'parseRequest').and.returnValue([]);
      spyOn(instance, 'sendLuffyMessage').and.callFake(() => {});
      instance.parseLuffyMessage(socketInstance, data);
      expect(instance.requestParser.parseRequest).toHaveBeenCalledWith(data);
    });

    it('should send a message of no results produced by your query', () => {
      spyOn(instance.requestParser, 'isRequestActionValid').and.returnValue(true);
      spyOn(instance.requestParser, 'parseRequest').and.returnValue([]);
      spyOn(instance, 'sendLuffyMessage');
      instance.parseLuffyMessage(socketInstance, data);
      expect(instance.sendLuffyMessage).toHaveBeenCalledWith(socketInstance, { error: { message: 'Your query produced no results' } });
    });

    it('should call the processResponse method with the right parameters', () => {
      spyOn(instance.requestParser, 'isRequestActionValid').and.returnValue(true);
      spyOn(instance.requestParser, 'parseRequest').and.returnValue(['SYMB1', 'SYMB2', 'SYMB3']);
      spyOn(instance, 'processResponse');
      instance.parseLuffyMessage(socketInstance, data);
      expect(instance.processResponse).toHaveBeenCalledWith(['SYMB1', 'SYMB2', 'SYMB3'], socketInstance);
    });
  });

  describe('parseLuffyMessage', () => {
    const socketInstance: any = {};

    it('should call the getAndSendData method', () => {
      spyOn(instance, 'getAndSendData');
      instance.processResponse([], socketInstance);
      expect(instance.getAndSendData).toHaveBeenCalledWith(socketInstance, []);
    });

    it('should slice the symbols and call the getAndSendData with the sliced symbols', () => {
      jest.useFakeTimers();
      const symbols: string[] = ['SYMB1', 'SYMB2', 'SYMB3', 'SYMB4', 'SYMB5', 'SYMB6'];
      const spyFn = jest.fn((socketInstance: SocketIO.Socket, symbols: string[], pauser?: Subject<boolean>) => {
        if (pauser) {
          pauser.next(false);
        }
      });
      spyOn(instance, 'getAndSendData').and.callFake(spyFn);
      instance.processResponse(symbols, socketInstance);
      jest.runOnlyPendingTimers();
      jest.runOnlyPendingTimers();
      expect(spyFn).toHaveBeenCalledTimes(2);
      expect(spyFn).toHaveBeenNthCalledWith(1, socketInstance, ['SYMB1', 'SYMB2', 'SYMB3', 'SYMB4']);
      expect(spyFn).toHaveBeenNthCalledWith(2, socketInstance, ['SYMB5', 'SYMB6'], expect.anything());
    });
  });

  describe('getAndSendData', () => {
    const socketInstance: any = {};
    const pausableInterval: PausableInterval = new PausableInterval(1000 * 60, 10000);
    const symbols: string[] = ['FB'];

    it('should call the getDailyPricesBySymbols of AlphaVantageProxy with the right parameter', () => {
      instance.getAndSendData(socketInstance, symbols);
      expect(mockGetDailyPricesBySymbols).toHaveBeenCalledWith(symbols);
    });

    it('should call the method next of pauser with false', () => {
      spyOn(instance, 'sendLuffyMessage').and.callFake(() => {});
      spyOn(pausableInterval.pauser, 'next');
      instance.getAndSendData(socketInstance, symbols, pausableInterval.pauser);
      expect(pausableInterval.pauser.next).toHaveBeenCalledWith(false);
    });

    it('should send the luffy messages with the data', () => {
      spyOn(instance, 'sendLuffyMessage');
      instance.getAndSendData(socketInstance, symbols);
      expect(instance.sendLuffyMessage).toHaveBeenCalledWith(socketInstance, {
        data: { lastMovement: 150, priceChange: [150], symbol: 'FB', trend: 150 }
      });
    });
  });

  describe('sendCommonMessage', () => {
    it('should call the send method with the right parameters', () => {
      const socketInstance: any = {};
      const data: any = 'hello world';
      spyOn(instance, 'send').and.callFake(() => {});
      instance.sendCommonMessage(socketInstance, data);
      expect(instance.send).toHaveBeenCalledWith(socketInstance, 'message', data);
    });
  });

  describe('sendLuffyMessage', () => {
    it('should call the send method with the right parameters', () => {
      const socketInstance: any = {};
      const data: any = 'hello world';
      spyOn(instance, 'send').and.callFake(() => {});
      instance.sendLuffyMessage(socketInstance, data);
      expect(instance.send).toHaveBeenCalledWith(socketInstance, 'luffy-message', data);
    });
  });
});
