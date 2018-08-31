import * as httpMocks from 'node-mocks-http';
import { EventEmitter } from 'events';

const companyOne: any = {
  name: 'Facebook',
  sector: 'Technology',
  symbol: 'FB'
};
const companyTwo: any = {
  name: 'Bla bla bla corporated',
  sector: 'Consumer Services',
  symbol: 'BLA'
};
const companies: any[] = [companyOne, companyTwo];

const mockSendSuccessfulResponse = jest.fn();
jest.mock('./utils.controller', () => ({
  sendSuccessfulResponse: mockSendSuccessfulResponse
}));

const mockGetAllCompanies = jest.fn(() => [
  {
    symbol: 'FB',
    name: 'Facebook',
    sector: 'Technology'
  },
  {
    symbol: 'BLA',
    name: 'Bla bla bla corporated',
    sector: 'Consumer Services'
  }
]);
jest.mock('../entities/CompaniesProcessor', () => ({
  getAllCompanies: mockGetAllCompanies
}));

import { CompaniesController, onGetCompanies, filterBySymbol, filterBySector, getSector } from './companies.controller';

describe('CompaniesController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(CompaniesController).toBeDefined();
  });

  it('should define the exposed methods', () => {
    expect(typeof onGetCompanies).toEqual('function');
    expect(typeof filterBySymbol).toEqual('function');
    expect(typeof filterBySector).toEqual('function');
    expect(typeof getSector).toEqual('function');
  });

  describe('getSector', () => {
    it('should return the right value of the enum', () => {
      expect(getSector('TECHNOLOGY')).toEqual('Technology');
      expect(getSector('CAPITAL')).toEqual('Capital Goods');
    });
  });

  describe('filterBySymbol', () => {
    it('should return true if the company name is included in the provided symbols', () => {
      expect(filterBySymbol(['FB'], companyOne)).toBeTruthy();
    });

    it('should return false if the company name is not included in the provided symbols', () => {
      expect(filterBySymbol(['SADASDSAD'], companyOne)).toBeFalsy();
    });
  });

  describe('filterBySector', () => {
    it('should return true if the company sector is included in the provided sectors', () => {
      expect(filterBySector(['Technology'], companyOne)).toBeTruthy();
    });

    it('should return false if the company sector is not included in the provided sectors', () => {
      expect(filterBySector(['SADASDSAD'], companyOne)).toBeFalsy();
    });
  });

  describe('onGetCompanies', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/companies/',
      params: {},
      query: {}
    });
    const response = httpMocks.createResponse({ eventEmitter: EventEmitter });

    it('should call the getAllCompanies method of CompaniesProcessor with the right parameters', () => {
      onGetCompanies(request, response);
      expect(mockGetAllCompanies).toHaveBeenCalled();
    });

    describe('response', () => {
      it('should return the list of all the companies', () => {
        onGetCompanies(request, response);
        expect(mockSendSuccessfulResponse).toHaveBeenCalledWith(response, companies);
      });

      it('should return the list of all the companies with the given symbols', () => {
        request.params.symbols = 'FB';
        onGetCompanies(request, response);
        expect(mockSendSuccessfulResponse).toHaveBeenCalledWith(response, [companyOne]);
        delete request.params.symbols;
      });

      it('should return the list of all the companies with the given sectors', () => {
        request.query.sectors = ['services'];
        onGetCompanies(request, response);
        expect(mockSendSuccessfulResponse).toHaveBeenCalledWith(response, [companyTwo]);
        delete request.query.sectors;
      });
    });
  });
});
