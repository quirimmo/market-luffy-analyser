import * as httpMocks from 'node-mocks-http';
import { getRequestParameters } from './request-utils';

describe('request utils', () => {
  it('should define the getRequestParameters method', () => {
    expect(typeof getRequestParameters).toEqual('function');
  });

  describe('getRequestParameters', () => {
    let request: any;
    beforeEach(() => {
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/stock-prices/',
        params: {}
      });
    });

    describe('isPercentage', () => {
      it('should return isPercentage by default', () => {
        expect(getRequestParameters(request).isPercentage).toBeTruthy();
      });

      it('should return false', () => {
        request.params.isPercentage = false;
        expect(getRequestParameters(request).isPercentage).toBeFalsy();
      });
    });

    describe('size', () => {
      it('should return the provided size', () => {
        request.params.size = 'custom-size';
        expect(getRequestParameters(request).size).toEqual('custom-size');
      });
    });

    describe('symbols', () => {
      it('should return an empty array if undefined', () => {
        expect(getRequestParameters(request).symbols).toEqual([]);
      });

      it('should return an array of a single element if just one provided', () => {
        request.params.symbols = 'BLA';
        expect(getRequestParameters(request).symbols).toEqual(['BLA']);
      });

      it('should return an array with all the given elements', () => {
        request.params.symbols = 'BLA1,BLA2,BLA3';
        expect(getRequestParameters(request).symbols).toEqual(['BLA1', 'BLA2', 'BLA3']);
      });
    });
  });
});
