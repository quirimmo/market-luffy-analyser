import Company from './../models/Company';
import { SELECT_COMPANY } from './../actions/company.action';
import companyReducer from './company.reducer';

const NOT_EXISTENT_ACTION = {
	type: 'NOT_EXISTENT'
};
const company = new Company('Symbol', 'Company', 1, 2, 'Sector', 'Industry');
const SELECT_COMPANY_ACTION = {
	type: SELECT_COMPANY,
	company
};

describe('companyReducer', () => {
	it('should be defined', () => {
		expect(companyReducer).toBeDefined();
		expect(typeof companyReducer).toEqual('function');
	});

	it('should return the initial state if the action not exist', () => {
		expect(companyReducer(null, NOT_EXISTENT_ACTION)).toEqual(null);
	});

	it('should return the company', () => {
		expect(companyReducer(null, SELECT_COMPANY_ACTION)).toEqual(company);
	});
});
