import Company from './../models/Company';
import { FETCH_COMPANIES } from './../actions/companies.action';
import companies from './companies.reducer';

const NOT_EXISTENT_ACTION = {
	type: 'NOT_EXISTENT',
	companies: ['BLA']
};
const NEW_COMPANY = new Company('Company 1');
const FETCH_COMPANIES_ACTION = {
	type: FETCH_COMPANIES,
	companies: [NEW_COMPANY]
};

describe('companies', () => {
	it('should be defined', () => {
		expect(companies).toBeDefined();
		expect(typeof companies).toEqual('function');
	});

	it('should return the initial state if the action not exist', () => {
		expect(companies([], NOT_EXISTENT_ACTION)).toEqual([]);
	});

	it('should concatenate the companies into the state', () => {
		expect(companies([], FETCH_COMPANIES_ACTION)).toEqual([NEW_COMPANY]);
	});
});