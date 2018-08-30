import AlphaVantageProxy from './AlphaVantageProxy';

jest.mock('./HTTPRequester');

jest.mock('rxjs/operators/', () => {
  return {
    pluck: jest.fn(),
    map: jest.fn()
  };
});
import { pluck, map } from 'rxjs/operators';

const instance = new AlphaVantageProxy();

describe('AlphaVantageProxy', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(AlphaVantageProxy).toBeDefined();
  });

  it('should be an instance of the class', () => {
    expect(instance instanceof AlphaVantageProxy).toBeTruthy();
  });

  it('should define the methods', () => {
    expect(typeof instance.getDailyPricesBySymbol).toEqual('function');
    expect(typeof instance.getDailyPricesBySymbols).toEqual('function');
    expect(typeof instance.getRequestURL).toEqual('function');
    expect(typeof instance.pluckResponseData).toEqual('function');
  });

  describe('getDailyPricesBySymbol', () => {
    it('should call the getRequestURL method with the right parameter', () => {
      const spy = spyOn(instance, 'getRequestURL');
      instance.getDailyPricesBySymbol('FB');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('TIME_SERIES_DAILY', 'FB');
    });

    it('should call the get method of httprequester with the right parameter', () => {
      const spy = jest.spyOn(instance.httpRequester, 'get');
      instance.getDailyPricesBySymbol('FB');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=FB&apikey=X71A1MTU6F1C1B4G');
    });

    it('should call the pluckResponseData method', () => {
      const spy = jest.spyOn(instance, 'pluckResponseData');
      instance.getDailyPricesBySymbol('FB');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('Time Series (Daily)');
    });

    it('should call the map rxjs method', () => {
      instance.getDailyPricesBySymbol('FB');
      expect(map).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDailyPricesBySymbols', () => {
    it('should call the getRequestURL method 2 times with the right parameters', () => {
      const spy = jest.spyOn(instance, 'getRequestURL');
      instance.getDailyPricesBySymbols(['FB', 'TWITTER']);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith('TIME_SERIES_DAILY', 'FB');
    });

    it('should call the getAll method of httprequester twice with the right parameters', () => {
      const spy = jest.spyOn(instance.httpRequester, 'getAll');
      instance.getDailyPricesBySymbols(['FB', 'TWITTER']);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith([
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=FB&apikey=X71A1MTU6F1C1B4G',
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TWITTER&apikey=X71A1MTU6F1C1B4G'
      ]);
    });

    it('should call the map rxjs method', () => {
      instance.getDailyPricesBySymbols(['FB', 'TWITTER']);
      expect(map).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRequestURL', () => {
    it('should return the composed URL', () => {
      expect(instance.getRequestURL('method', 'symbol')).toEqual(
        'https://www.alphavantage.co/query?function=method&symbol=symbol&apikey=X71A1MTU6F1C1B4G'
      );
    });
  });

  describe('pluckResponseData', () => {
    it('should call the rxjs pluck method with the right parameters', () => {
      instance.pluckResponseData('values key');
      expect(pluck).toHaveBeenCalledTimes(1);
      expect(pluck).toHaveBeenCalledWith('data', 'values key');
    });
  });
});
