import { of } from 'rxjs';

const mockGet = jest.fn();
const mockGetAll = jest.fn(() => {
  return of([
    {
      data: {
        'Time Series (Daily)': 'facebook',
        'Time Series (Digital Currency Daily)': 'bitcoin'
      }
    },
    {
      data: {
        'Time Series (Daily)': 'twitter',
        'Time Series (Digital Currency Daily)': 'ripple'
      }
    }
  ]);
});
jest.mock('./HTTPRequester', () =>
  jest.fn().mockImplementation(() => ({
    get: mockGet,
    getAll: mockGetAll
  }))
);

import DailyTimeSeries from '../daily-time/DailyTimeSeries';
import AlphaVantageProxy from './../http/AlphaVantageProxy';
import * as responseUtils from './../../utils/response-utils';

const instance = new AlphaVantageProxy();

describe('AlphaVantageProxy', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
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
  });

  describe('getDailyPricesBySymbols', () => {
    it('should call the getRequestURL method twice', () => {
      const spy = spyOn(instance, 'getRequestURL');
      instance.getDailyPricesBySymbols(['FB', 'TWITTER']);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, 'TIME_SERIES_DAILY', 'FB', 'compact');
      expect(spy).toHaveBeenNthCalledWith(2, 'TIME_SERIES_DAILY', 'TWITTER', 'compact');
    });

    it('should call the HTTPRequester getAll method', () => {
      spyOn(instance, 'getRequestURL').and.returnValue('request-value');
      instance.getDailyPricesBySymbols(['FB', 'TWITTER']);
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(mockGetAll).toHaveBeenCalledWith(['request-value', 'request-value']);
    });

    it('should call the DailyTimeSeries buildFromData method', () => {
      spyOn(instance, 'getRequestURL').and.returnValue(['request-url-fb', 'request-url-twitter']);
      const spy = spyOn(DailyTimeSeries, 'buildFromData');
      instance.getDailyPricesBySymbols(['FB', 'TWITTER']).subscribe();
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith('FB', 'facebook');
      expect(spy).toHaveBeenCalledWith('TWITTER', 'twitter');
    });
  });

  describe('getCryptoDailyPricesBySymbols', () => {
    it('should call the getCryptoRequestURL method twice', () => {
      const spy = spyOn(instance, 'getCryptoRequestURL');
      instance.getCryptoDailyPricesBySymbols(['BTC', 'XRP']);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, 'DIGITAL_CURRENCY_DAILY', 'BTC');
      expect(spy).toHaveBeenNthCalledWith(2, 'DIGITAL_CURRENCY_DAILY', 'XRP');
    });

    it('should call the HTTPRequester getAll method', () => {
      spyOn(instance, 'getCryptoRequestURL').and.returnValue('request-value');
      instance.getCryptoDailyPricesBySymbols(['BTC', 'XRP']);
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(mockGetAll).toHaveBeenCalledWith(['request-value', 'request-value']);
    });

    it('should call the DailyTimeSeries buildFromData method', () => {
      spyOn(instance, 'getCryptoRequestURL').and.returnValue(['request-url-btc', 'request-url-xrp']);
      const spy = spyOn(DailyTimeSeries, 'buildFromData');
      instance.getCryptoDailyPricesBySymbols(['BTC', 'XRP']).subscribe();
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith('BTC', 'bitcoin', true);
      expect(spy).toHaveBeenCalledWith('XRP', 'ripple', true);
    });

    it('should call the findErrorInResponses method of response-utils', (done: any) => {
      const spy = spyOn(responseUtils, 'findErrorInResponses');
      spyOn(instance, 'getCryptoRequestURL').and.returnValue('request-value');
      spyOn(DailyTimeSeries, 'buildFromData').and.callFake(() => {});
      instance.getCryptoDailyPricesBySymbols(['BTC', 'XRP']).subscribe(() => {
        done();
      });
      expect(spy).toHaveBeenCalled();
    });

    it('should call the findErrorInResponses method of response-utils', (done: any) => {
      spyOn(responseUtils, 'findErrorInResponses').and.returnValue(true);
      spyOn(instance, 'getCryptoRequestURL').and.returnValue('request-value');
      instance.getCryptoDailyPricesBySymbols(['BTC', 'XRP']).subscribe(
        () => {},
        (err: any) => {
          expect(err).toBeDefined();
          done();
        }
      );
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
});
