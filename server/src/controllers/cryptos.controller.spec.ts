import DailyTime from './../entities/DailyTime';
import DailyTimeSeries from './../entities/DailyTimeSeries';
import { of } from 'rxjs';
import * as httpMocks from 'node-mocks-http';
import { EventEmitter } from 'events';
import CryptoDailyTime from '../entities/CryptoDailyTime';

const firstCryptoFirstDailyTime: CryptoDailyTime = new CryptoDailyTime('2018-08-16', {
  '1a. open (USD)': '60.00',
  '2a. high (USD)': '70.00',
  '3a. low (USD)': '80.00',
  '4a. close (USD)': '100.00',
	'5. volume': '100.00',
	'6. market cap (USD)': '200.00'
});
const secondCryptoFirstDailyTime: CryptoDailyTime = new CryptoDailyTime('2018-08-15', {
  '1a. open (USD)': '10.00',
  '2a. high (USD)': '20.00',
  '3a. low (USD)': '30.00',
  '4a. close (USD)': '40.00',
  '5. volume': '50.00',
	'6. market cap (USD)': '200.00'
});
const firstCryptoSecondDailyTime: CryptoDailyTime = new CryptoDailyTime('2018-08-14', {
  '1a. open (USD)': '10.00',
  '2a. high (USD)': '20.00',
  '3a. low (USD)': '30.00',
  '4a. close (USD)': '-10.00',
  '5. volume': '50.00',
	'6. market cap (USD)': '200.00'
});
const secondCryptoSecondDailyTime: CryptoDailyTime = new CryptoDailyTime('2018-08-13', {
  '1a. open (USD)': '10.00',
  '2a. high (USD)': '20.00',
  '3a. low (USD)': '30.00',
  '4a. close (USD)': '10.00',
  '5. volume': '50.00',
	'6. market cap (USD)': '200.00'
});

const first_daily_times: DailyTime[] = [firstCryptoFirstDailyTime, secondCryptoFirstDailyTime];
const second_daily_times: DailyTime[] = [firstCryptoSecondDailyTime, secondCryptoSecondDailyTime];
const firstStockDailyTimeSeries: DailyTimeSeries = new DailyTimeSeries('FIRST_CRYPTO', first_daily_times);
const secondStockDailyTimeSeries: DailyTimeSeries = new DailyTimeSeries('SECOND_CRYPTO', second_daily_times);
const dailyTimeSeries: DailyTimeSeries[] = [firstStockDailyTimeSeries, secondStockDailyTimeSeries];

const mockGetCryptos = jest.fn((symbols: string[], numberOfValues: number) => {
  return of(dailyTimeSeries);
});
const mockGetRequestParameters = jest.fn((req: any) => {
  return {
    isPercentage: req.params.isPercentage,
    size: req.params.size,
    symbols: req.params.symbols
  };
});
const mockSendSuccessfulResponse = jest.fn((resp: Response, data: any) => {});

jest.mock('./utils.controller', () => ({
  getRequestParameters: mockGetRequestParameters,
  getCryptos: mockGetCryptos,
  sendSuccessfulResponse: mockSendSuccessfulResponse
}));
import { getCryptos, getRequestParameters, sendSuccessfulResponse } from './utils.controller';
import { CryptosController, onGetCryptos } from './cryptos.controller';
import CryptosProcessor from '../entities/CryptosProcessor';

describe('CryptosController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should define the CryptosController', () => {
		expect(CryptosController).toBeDefined();
  });

  describe('onGetCryptos', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/cryptos/',
      params: {
        isPercentage: true,
        symbols: 'BTC,ETH'
      }
    });
    const response = httpMocks.createResponse({ eventEmitter: EventEmitter });

    it('should call the getRequestParameters method with the right parameters', () => {
      onGetCryptos(request, response);
      expect(mockGetRequestParameters).toHaveBeenCalledWith(request);
    });

    it('should call the getCryptos with the right parameters', () => {
      onGetCryptos(request, response);
      expect(mockGetCryptos).toHaveBeenCalledWith('BTC,ETH');
    });

    it('should call the sendSuccessfulResponse method of utils for sending the data', () => {
      onGetCryptos(request, response);
      expect(mockSendSuccessfulResponse).toHaveBeenCalledWith(response, {
        data: {
          FIRST_CRYPTO: {
            lastMovement: 150,
            prices: [firstCryptoFirstDailyTime, secondCryptoFirstDailyTime],
            trend: 150,
            priceChange: [150]
          },
          SECOND_CRYPTO: {
            lastMovement: -200,
            prices: [firstCryptoSecondDailyTime, secondCryptoSecondDailyTime],
            trend: -200,
            priceChange: [-200]
          }
        }
      });
    });

    it('should call the getAllCryptos method of CryptosProcessor', () => {
      const spy = spyOn(CryptosProcessor, 'getAllCryptos').and.returnValue([{ symbol: 'CPT1', name: 'crypto1'}]);
      request.params.symbols = '';
      onGetCryptos(request, response);
      expect(spy).toHaveBeenCalled();
    });

    it('should call the sendSuccessfulResponse method of utils for sending the data', () => {
      const spy = spyOn(CryptosProcessor, 'getAllCryptos').and.returnValue([{ symbol: 'CPT1', name: 'crypto1'}]);
      request.params.symbols = '';
      onGetCryptos(request, response);
      expect(mockSendSuccessfulResponse).toHaveBeenCalledWith(response, [{ symbol: 'CPT1', name: 'crypto1'}]);
    });
  });
});
