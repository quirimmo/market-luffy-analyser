import DailyTime from './../entities/DailyTime';
import DailyTimeSeries from './../entities/DailyTimeSeries';
import { of } from 'rxjs';
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
const firstStockDailyTimeSeries: DailyTimeSeries = new DailyTimeSeries('FIRST_STOCK', first_daily_times);
const secondStockDailyTimeSeries: DailyTimeSeries = new DailyTimeSeries('SECOND_STOCK', second_daily_times);
const dailyTimeSeries: DailyTimeSeries[] = [firstStockDailyTimeSeries, secondStockDailyTimeSeries];

const mockGetPrices = jest.fn((symbols: string[], numberOfValues: number) => {
  return of(dailyTimeSeries);
});
const mockGetRequestParameters = jest.fn((req: any) => {
  return {
    isPercentage: req.params.isPercentage,
    numberOfValues: req.params.numberOfValues,
    symbols: req.params.symbols
  };
});

jest.mock('./utils.controller', () => ({
  getRequestParameters: mockGetRequestParameters,
  getPrices: mockGetPrices
}));
import { getPrices, getRequestParameters } from './utils.controller';
import { TrendsController, onGetTrends } from './trends.controller';

describe('TrendsController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should define the TrendsController', () => {
    expect(TrendsController).toBeDefined();
  });

  describe('onGetTrends', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/trend/',
      params: {
        isPercentage: true,
        numberOfValues: 2,
        symbols: 'FB,GOOG'
      }
    });
    const response = httpMocks.createResponse({ eventEmitter: EventEmitter });

    it('should call the getRequestParameters method with the right parameters', () => {
      onGetTrends(request, response);
      expect(mockGetRequestParameters).toHaveBeenCalledWith(request);
    });

    it('should call the getPrices with the right parameters', () => {
      onGetTrends(request, response);
      expect(mockGetPrices).toHaveBeenCalledWith('FB,GOOG', 2);
    });

    it('should call the response.send method sending the data', () => {
      const spy = spyOn(response, 'send');
      onGetTrends(request, response);
      expect(spy).toHaveBeenCalledWith({
        data: {
          FIRST_STOCK: 150,
          SECOND_STOCK: -200
        }
      });
    });
  });
});
