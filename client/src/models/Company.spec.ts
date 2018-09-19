import Company from './Company';
import WebServiceProxy from './../services/WebServiceProxy';

const instance: Company = new Company('Symbol 1', 'Company 1', 1, 2, 'Sector 1', 'Industry 1');

describe('Company', () => {
	it('should be defined', () => {
		expect(Company).toBeDefined();
	});

	it('should create an instance of the class', () => {
		expect(instance instanceof Company).toBeTruthy();
	});

	it('should define the exposed methods', () => {
		expect(typeof instance.getPricesInfo).toEqual('function');
	});

	describe('constructor', () => {
		it('should init the attributes', () => {
			expect(instance.symbol).toEqual('Symbol 1');
			expect(instance.name).toEqual('Company 1');
			expect(instance.lastSale).toEqual(1);
			expect(instance.marketCap).toEqual(2);
			expect(instance.sector).toEqual('Sector 1');
			expect(instance.industry).toEqual('Industry 1');
			expect(instance.isVisible).toBeTruthy();
			expect(instance.dailySerie).toBeUndefined();
		});
	});

	describe('getPricesInfo', () => {
		it('should call the getCompanyPricesInfo method of the WebServiceProxy', () => {
			const spy = spyOn(WebServiceProxy, 'getCompanyPricesInfo');
			instance.getPricesInfo();
			expect(spy).toHaveBeenCalledWith(instance.symbol);
		});
	});
});
