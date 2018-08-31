import Company from './Company';

const instance: Company = new Company('Symbol 1');

describe('Company', () => {
	it('should be defined', () => {
		expect(Company).toBeDefined();
	});

	it('should create an instance of the class', () => {
		expect(instance instanceof Company).toBeTruthy();
	});

	describe('constructor', () => {
		it('should init the attributes', () => {
			expect(instance.symbol).toEqual('Symbol 1');
		});
	});
});
