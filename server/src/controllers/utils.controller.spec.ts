import * as httpMocks from 'node-mocks-http';

let mockGetDailyPricesBySymbols = jest.fn();
jest.mock('./../entities/AlphaVantageProxy', () =>
  jest.fn().mockImplementation(() => ({
    getDailyPricesBySymbols: mockGetDailyPricesBySymbols
  }))
);

import { getRequestParameters, getPrices } from './utils.controller';

describe('utils.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should define the exposed functions', () => {
    expect(typeof getRequestParameters).toEqual('function');
    expect(typeof getPrices).toEqual('function');
  });

  describe('getPrices', () => {
    it('should call the alpha vantage proxy getDailyPricesBySymbols method with the right parameters', () => {
      getPrices(['FB', 'GOOG'], 31);
      expect(mockGetDailyPricesBySymbols).toHaveBeenCalledWith(['FB', 'GOOG'], 31);
    });
  });

  describe('getRequestParameters', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: 'url',
      params: {
        isPercentage: true,
        numberOfValues: 31,
        symbols: 'FB,GOOG'
      }
    });

    it('should return the composed object', () => {
      expect(getRequestParameters(request)).toEqual({
        isPercentage: true,
        numberOfValues: 31,
        symbols: ['FB', 'GOOG']
      });
    });
  });
});
