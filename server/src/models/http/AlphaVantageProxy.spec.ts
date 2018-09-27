import AlphaVantageProxy from './../http/AlphaVantageProxy';

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
    expect(typeof instance.getDailyPricesBySymbols).toEqual('function');
    expect(typeof instance.getCryptoDailyPricesBySymbols).toEqual('function');
    expect(typeof instance.getRequestURL).toEqual('function');
    expect(typeof instance.getCryptoRequestURL).toEqual('function');
    expect(typeof instance.pluckResponseData).toEqual('function');
  });

  describe('getDailyPricesBySymbols', () => {
    it('should call the getRequestURL method 2 times with the right parameters', () => {
      const spy = jest.spyOn(instance, 'getRequestURL');
      instance.getDailyPricesBySymbols(['FB', 'TWITTER']);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, 'TIME_SERIES_DAILY', 'FB', 'compact');
      expect(spy).toHaveBeenNthCalledWith(2, 'TIME_SERIES_DAILY', 'TWITTER', 'compact');
    });

    it('should call the getAll method of httprequester twice with the right parameters', () => {
      const spy = jest.spyOn(instance.httpRequester, 'getAll');
      instance.getDailyPricesBySymbols(['FB', 'TWITTER']);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith([
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=FB&apikey=X71A1MTU6F1C1B4G&outputsize=compact',
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TWITTER&apikey=X71A1MTU6F1C1B4G&outputsize=compact'
      ]);
    });

    it('should call the map rxjs method', () => {
      instance.getDailyPricesBySymbols(['FB', 'TWITTER']);
      expect(map).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCryptoDailyPricesBySymbols', () => {
    it('should call the getRequestURL method 2 times with the right parameters', () => {
      const spy = jest.spyOn(instance, 'getCryptoRequestURL');
      instance.getCryptoDailyPricesBySymbols(['BTC', 'ETH']);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, 'DIGITAL_CURRENCY_DAILY', 'BTC');
      expect(spy).toHaveBeenNthCalledWith(2, 'DIGITAL_CURRENCY_DAILY', 'ETH');
    });

    it('should call the getAll method of httprequester twice with the right parameters', () => {
      const spy = jest.spyOn(instance.httpRequester, 'getAll');
      instance.getCryptoDailyPricesBySymbols(['BTC', 'ETH']);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith([
        'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&apikey=X71A1MTU6F1C1B4G&market=USD',
        'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=ETH&apikey=X71A1MTU6F1C1B4G&market=USD'
      ]);
    });

    it('should call the map rxjs method', () => {
      instance.getCryptoDailyPricesBySymbols(['BTC', 'ETH']);
      expect(map).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRequestURL', () => {
    it('should return the composed URL', () => {
      expect(instance.getRequestURL('method', 'symbol')).toEqual(
        'https://www.alphavantage.co/query?function=method&symbol=symbol&apikey=X71A1MTU6F1C1B4G&outputsize=compact'
      );
    });
  });

  describe('getCryptoRequestURL', () => {
    it('should return the composed URL', () => {
      expect(instance.getCryptoRequestURL('method', 'symbol')).toEqual(
        'https://www.alphavantage.co/query?function=method&symbol=symbol&apikey=X71A1MTU6F1C1B4G&market=USD'
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
