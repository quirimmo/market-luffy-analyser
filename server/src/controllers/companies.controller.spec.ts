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
jest.mock('../utils/response-utils', () => ({
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
jest.mock('../models/CompaniesProcessor', () => ({
  getAllCompanies: mockGetAllCompanies
}));

import { CompaniesController, onGetCompanies, filterBySector } from './companies.controller';

describe('CompaniesController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(CompaniesController).toBeDefined();
  });

  it('should define the exposed methods', () => {
    expect(typeof onGetCompanies).toEqual('function');
    expect(typeof filterBySector).toEqual('function');
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

      it('should return the list of all the companies with the given sectors', () => {
        request.query.sectors = ['services'];
        onGetCompanies(request, response);
        expect(mockSendSuccessfulResponse).toHaveBeenCalledWith(response, [companyTwo]);
        delete request.query.sectors;
      });
    });
  });
});
