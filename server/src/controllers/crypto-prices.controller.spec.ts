import DailyTime from './../models/daily-time/DailyTime';
import DailyTimeSeries from '../models/daily-time/DailyTimeSeries';
import { of } from 'rxjs';
import * as httpMocks from 'node-mocks-http';
import { EventEmitter } from 'events';
import CryptoDailyTime from '../models/daily-time/CryptoDailyTime';

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

const mockGetCryptoDailyPricesBySymbols = jest.fn(() => of(dailyTimeSeries));
const mockGetRequestParameters = jest.fn((req: any) => ({
  isPercentage: req.params.isPercentage,
  size: req.params.size,
  symbols: req.params.symbols
}));
const mockSendSuccessfulResponse = jest.fn((resp: Response, data: any) => {});
const mockBuildDailySerieResponse = jest.fn((serie: DailyTimeSeries, ret: any) => ({
  data: 'response'
}));

jest.mock('../utils/response-utils', () => ({
  sendSuccessfulResponse: mockSendSuccessfulResponse,
  buildDailySerieResponse: mockBuildDailySerieResponse
}));
jest.mock('../utils/request-utils', () => ({
  getRequestParameters: mockGetRequestParameters
}));
jest.mock('./../models/http/AlphaVantageProxy', () =>
  jest.fn().mockImplementation(() => ({
    getCryptoDailyPricesBySymbols: mockGetCryptoDailyPricesBySymbols
  }))
);

import { CryptoPricesController, onGetCryptoPrices } from './crypto-prices.controller';

describe('CryptoPricesController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should define the CryptosController', () => {
    expect(CryptoPricesController).toBeDefined();
  });

  describe('onGetCryptoPrices', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/crypto-prices/',
      params: {
        isPercentage: true,
        symbols: 'BTC,ETH'
      }
    });
    const response = httpMocks.createResponse({ eventEmitter: EventEmitter });

    it('should call the getRequestParameters method', () => {
      onGetCryptoPrices(request, response);
      expect(mockGetRequestParameters).toHaveBeenCalledWith(request);
    });

    it('should call the getCryptoDailyPricesBySymbols method', () => {
      onGetCryptoPrices(request, response);
      expect(mockGetCryptoDailyPricesBySymbols).toHaveBeenCalledWith('BTC,ETH');
    });

    it('should call the sendSuccessfulResponse method of utils for sending the data', () => {
      onGetCryptoPrices(request, response);
      expect(mockSendSuccessfulResponse).toHaveBeenCalledWith(response, { data: 'response' });
    });
  });
});
