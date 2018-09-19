const mockAjax = jest.fn(() =>
	of({
		response: [
			{
				symbol: 'Symbol',
				name: 'Name',
				lastSale: 1,
				marketCap: 2,
				sector: 'Sector',
				industry: 'Industry'
			}
		]
	})
);
jest.mock('rxjs/ajax', () => ({
	ajax: mockAjax
}));

import WebServiceProxy from './WebServiceProxy';
import { of } from 'rxjs';
import { COMPANIES_RESOURCE_URL } from './../constants/constants';
import Company from './../models/Company';

const instance: WebServiceProxy = new WebServiceProxy();

describe('WebServiceProxy', () => {
	afterEach(() => {
		jest.clearAllMocks();
		jest.clearAllTimers();
	});

	it('should be defined', () => {
		expect(WebServiceProxy).toBeDefined();
	});

	it('should create an instance of the class', () => {
		expect(instance instanceof WebServiceProxy).toBeTruthy();
	});

	it('should define the exposed methdos', () => {
		expect(typeof WebServiceProxy.getCompanies).toEqual('function');
		expect(typeof WebServiceProxy.getCompanyPricesInfo).toEqual('function');
	});

	describe('getCompanies', () => {
		it('should call the ajax method of rxjs with the right parameter', () => {
			WebServiceProxy.getCompanies();
			expect(mockAjax).toHaveBeenCalledWith(COMPANIES_RESOURCE_URL);
		});

		it('should receive the Company instance', () => {
			jest.useFakeTimers();
			WebServiceProxy.getCompanies().subscribe((data: any) => {
				expect(data).toEqual([new Company('Symbol', 'Name', 1, 2, 'Sector', 'Industry')]);
			});
			jest.runOnlyPendingTimers();
		});
	});

	describe('getCompanyPricesInfo', () => {
		it('should call the ajax method of rxjs with the compact size parameter', () => {
			WebServiceProxy.getCompanyPricesInfo('symbol');
			expect(mockAjax).toHaveBeenCalledWith(`http://localhost:3000/prices/symbol/compact`);
		});

		it('should call the ajax method of rxjs with the full size parameter', () => {
			WebServiceProxy.getCompanyPricesInfo('symbol', false);
			expect(mockAjax).toHaveBeenCalledWith(`http://localhost:3000/prices/symbol/full`);
		});
	});
});
