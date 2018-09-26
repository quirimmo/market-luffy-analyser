import * as httpMocks from 'node-mocks-http';
import { EventEmitter } from 'events';
import { sendSuccessfulResponse, buildDailySerieResponse } from './response-utils';
import DailyTimeSeries from '../entities/DailyTimeSeries';
import DailyTime from '../entities/DailyTime';

const stockDailyTime: DailyTime = new DailyTime('2018-08-16', {
  '1. open': '60.00',
  '2. high': '70.00',
  '3. low': '80.00',
  '4. close': '100.00',
  '5. volume': '100.00'
});

const response = httpMocks.createResponse({ eventEmitter: EventEmitter });
let mockHeader: any;
let mockStatus: any;
let mockSend: any;

describe('response utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockHeader = spyOn(response, 'header');
    mockStatus = spyOn(response, 'status');
    mockSend = spyOn(response, 'send');
  });

  it('should define the methods', () => {
    expect(typeof sendSuccessfulResponse).toEqual('function');
    expect(typeof buildDailySerieResponse).toEqual('function');
  });

  describe('sendSuccessfulResponse', () => {
    it('should call the header method of the response', () => {
      sendSuccessfulResponse(response, 'data');
      expect(mockHeader).toHaveBeenCalledTimes(2);
      expect(mockHeader).toHaveBeenNthCalledWith(1, 'Access-Control-Allow-Origin', '*');
      expect(mockHeader).toHaveBeenNthCalledWith(2, 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    });

    it('should call the status method of the response', () => {
      sendSuccessfulResponse(response, 'data');
      expect(mockStatus).toHaveBeenCalledWith(200);
    });

    it('should call the send method of the response', () => {
      sendSuccessfulResponse(response, 'data');
      expect(mockSend).toHaveBeenCalledWith('data');
    });
  });

  describe('buildDailySerieResponse', () => {
    it('should return undefined if the serie has not daily times', () => {
      const dailyTimeSerie = new DailyTimeSeries();
      expect(buildDailySerieResponse(dailyTimeSerie)).toBeUndefined();
    });

    it('should return the composed object for the response', () => {
      const dailyTimeSerie = new DailyTimeSeries('symbol', [stockDailyTime]);
      spyOn(dailyTimeSerie, 'getLastMovement').and.returnValue(0);
      spyOn(dailyTimeSerie, 'getPriceChangeByPeriod').and.returnValue(1);
      spyOn(dailyTimeSerie, 'getTrendByPeriod').and.returnValue(2);
      expect(buildDailySerieResponse(dailyTimeSerie)).toEqual({
        symbol: {
          lastMovement: 0,
          priceChange: 1,
          trend: 2,
          prices: [stockDailyTime]
        }
      });
    });
  });
});
