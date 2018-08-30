import * as httpMocks from 'node-mocks-http';
import { EventEmitter } from 'events';

const companyOne: any = {
  Symbol: 'FB',
  Name: 'Facebook',
  Sector: 'Technology'
};
const companyTwo: any = {
  Symbol: 'BLA',
  Name: 'Bla bla bla corporated',
  Sector: 'Consumer Services'
};
const companies: any[] = [companyOne, companyTwo];

jest.mock('fs', () => {
  return {
    readFileSync: jest.fn((file: string) => {
      return `[
				{
					"Symbol": "FB",
					"Name": "Facebook",
					"Sector": "Technology"
				},
				{
					"Symbol": "BLA",
					"Name": "Bla bla bla corporated",
					"Sector": "Consumer Services"
				}
			]`;
    })
  };
});
import { readFileSync } from 'fs';

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

    it('should call the readFileSync with the right parameters', () => {
      onGetCompanies(request, response);
      expect(readFileSync).toHaveBeenCalledWith('src/data/all-companies.json');
    });

    describe('response', () => {
      it('should return the list of all the companies', () => {
        const spy = spyOn(response, 'send');
        onGetCompanies(request, response);
        expect(spy).toHaveBeenCalledWith(companies);
      });

      it('should return the list of all the companies with the given symbols', () => {
				request.params.symbols = 'FB';
				const spy = spyOn(response, 'send');
        onGetCompanies(request, response);
				expect(spy).toHaveBeenCalledWith([companyOne]);
				delete request.params.symbols;
			});

      it('should return the list of all the companies with the given sectors', () => {
				request.query.sectors = ['services'];
				const spy = spyOn(response, 'send');
        onGetCompanies(request, response);
				expect(spy).toHaveBeenCalledWith([companyTwo]);
				delete request.query.sectors;
			});
    });
  });
});
