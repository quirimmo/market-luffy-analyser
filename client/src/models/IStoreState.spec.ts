import IStoreState from './IStoreState';
import Company from './../models/Company';

const company: Company = new Company('Symbol 1', 'Company 1', 1, 2, 'Sector 1', 'Industry 1');

const storeState: IStoreState = {
	companies: [company],
	dailySeries: []
};

describe('StoreState', () => {
	it('should be defined', () => {
		expect(storeState).toBeDefined();
	});

	it('should set the properties', () => {
		expect(storeState.companies).toEqual([company]);
	});
});