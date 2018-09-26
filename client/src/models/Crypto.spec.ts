import Company from './Company';
import WebServiceProxy from './../services/WebServiceProxy';
import Crypto from './Crypto';

const instance: Crypto = new Crypto('Symbol 1', 'Name 1');

describe('Crypto', () => {
	it('should be defined', () => {
		expect(Company).toBeDefined();
	});

	it('should create an instance of the class', () => {
		expect(instance instanceof Crypto).toBeTruthy();
	});

	it('should define the exposed methods', () => {
		// expect(typeof instance.getPricesInfo).toEqual('function');
	});

	describe('constructor', () => {
		it('should init the attributes', () => {
			expect(instance.symbol).toEqual('Symbol 1');
			expect(instance.name).toEqual('Name 1');
			expect(instance.isVisible).toBeTruthy();
			expect(instance.dailySerie).toBeUndefined();
		});
	});

	// describe('getPricesInfo', () => {
	// 	it('should call the getCompanyPricesInfo method of the WebServiceProxy', () => {
	// 		const spy = spyOn(WebServiceProxy, 'getCompanyPricesInfo');
	// 		instance.getPricesInfo();
	// 		expect(spy).toHaveBeenCalledWith(instance.symbol);
	// 	});
	// });
});
