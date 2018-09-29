import DailyTime from './../models/daily-time/DailyTime';
import DailyTimeSeries from '../models/daily-time/DailyTimeSeries';
import { of, throwError } from 'rxjs';
import * as httpMocks from 'node-mocks-http';
import { EventEmitter } from 'events';

const firstStockFirstDailyTime: DailyTime = new DailyTime('2018-08-16', {
  '1. open': '60.00',
  '2. high': '70.00',
  '3. low': '80.00',
  '4. close': '100.00',
  '5. volume': '100.00'
});
const secondStockFirstDailyTime: DailyTime = new DailyTime('2018-08-15', {
  '1. open': '10.00',
  '2. high': '20.00',
  '3. low': '30.00',
  '4. close': '40.00',
  '5. volume': '50.00'
});
const firstStockSecondDailyTime: DailyTime = new DailyTime('2018-08-14', {
  '1. open': '10.00',
  '2. high': '20.00',
  '3. low': '30.00',
  '4. close': '-10.00',
  '5. volume': '50.00'
});
const secondStockSecondDailyTime: DailyTime = new DailyTime('2018-08-13', {
  '1. open': '10.00',
  '2. high': '20.00',
  '3. low': '30.00',
  '4. close': '10.00',
  '5. volume': '50.00'
});

const first_daily_times: DailyTime[] = [firstStockFirstDailyTime, secondStockFirstDailyTime];
const second_daily_times: DailyTime[] = [firstStockSecondDailyTime, secondStockSecondDailyTime];
const firstStockDailyTimeSeries: DailyTimeSeries = new DailyTimeSeries('FIRST_CRYPTO', first_daily_times);
const secondStockDailyTimeSeries: DailyTimeSeries = new DailyTimeSeries('SECOND_CRYPTO', second_daily_times);
const dailyTimeSeries: DailyTimeSeries[] = [firstStockDailyTimeSeries, secondStockDailyTimeSeries];

const mockGetDailyPricesBySymbols = jest.fn(() => of(dailyTimeSeries));
const mockGetRequestParameters = jest.fn((req: any) => ({
  isPercentage: req.params.isPercentage,
  size: req.params.size,
  symbols: req.params.symbols
}));
const mockSendSuccessfulResponse = jest.fn((resp: Response, data: any) => {});
const mockSendErrorResponse = jest.fn();
const mockBuildDailySerieResponse = jest.fn((serie: DailyTimeSeries, ret: any) => ({
  data: 'response'
}));

jest.mock('../utils/response-utils', () => ({
  sendSuccessfulResponse: mockSendSuccessfulResponse,
  sendErrorResponse: mockSendErrorResponse,
  buildDailySerieResponse: mockBuildDailySerieResponse
}));
jest.mock('../utils/request-utils', () => ({
  getRequestParameters: mockGetRequestParameters
}));
jest.mock('./../models/http/AlphaVantageProxy', () =>
  jest.fn().mockImplementation(() => ({
    getDailyPricesBySymbols: mockGetDailyPricesBySymbols
  }))
);

import { StockPricesController, onGetStockPrices, alphaVantageProxy } from './stock-prices.controller';

describe('StockPricesController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should define the StockPricesController', () => {
    expect(StockPricesController).toBeDefined();
  });

  describe('onGetStockPrices', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/stock-prices/',
      params: {
        isPercentage: true,
        symbols: 'FB,GOOG'
      }
    });
    const response = httpMocks.createResponse({ eventEmitter: EventEmitter });

    it('should call the getRequestParameters method', () => {
      onGetStockPrices(request, response);
      expect(mockGetRequestParameters).toHaveBeenCalledWith(request);
    });

    it('should call the getDailyPricesBySymbols method', () => {
      onGetStockPrices(request, response);
      expect(mockGetDailyPricesBySymbols).toHaveBeenCalledWith('FB,GOOG', undefined);
    });

    it('should call the sendSuccessfulResponse method of utils for sending the data', () => {
      onGetStockPrices(request, response);
      expect(mockSendSuccessfulResponse).toHaveBeenCalledWith(response, { data: 'response' });
    });

    it('should call the sendErrorResponse method of utils for sending the error', () => {
      spyOn(alphaVantageProxy, 'getDailyPricesBySymbols').and.returnValue(throwError('SUPER ERROR'));
      onGetStockPrices(request, response);
      expect(mockSendErrorResponse).toHaveBeenCalledWith(response, 'Error retrieving the crypto daily prices: SUPER ERROR');
    });
  });
});
