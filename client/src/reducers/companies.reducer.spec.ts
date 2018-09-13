import Company from './../models/Company';
import { FETCH_COMPANIES_FULFILLED, TOGGLE_COMPANY_VISIBILITY } from './../actions/companies.action';
import companies from './companies.reducer';

const NOT_EXISTENT_ACTION = {
	type: 'NOT_EXISTENT',
	companies: ['BLA']
};
const COMPANY1 = new Company('Symbol 1', 'Company 1', 1, 2, 'Sector 1', 'Industry 1');
const COMPANY2 = new Company('Symbol 2', 'Company 2', 3, 4, 'Sector 1', 'Industry 2');
const allCompanies = [COMPANY1, COMPANY2];
const FETCH_COMPANIES_ACTION = {
	type: FETCH_COMPANIES_FULFILLED,
	companies: [COMPANY1]
};
const TOGGLE_COMPANY_VISIBILITY_ACTION = {
	type: TOGGLE_COMPANY_VISIBILITY
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
		expect(companies([], FETCH_COMPANIES_ACTION)).toEqual([COMPANY1]);
	});

	it('should not toggle the companies visibility', () => {
		expect(companies(allCompanies, TOGGLE_COMPANY_VISIBILITY_ACTION)).toEqual([COMPANY1, COMPANY2]);
	});

	it('should toggle visibility by sector', () => {
		const newVisibilityAction = Object.assign({}, TOGGLE_COMPANY_VISIBILITY_ACTION, { companySectors: ['SECTOR 1'], companyName: '' });
		expect(companies(allCompanies, newVisibilityAction).filter((company: Company) => company.isVisible)).toEqual([COMPANY1, COMPANY2]);
	});

	it('should toggle visibility by name', () => {
		const newVisibilityAction = Object.assign({}, TOGGLE_COMPANY_VISIBILITY_ACTION, { companySectors: ['SECTOR 1'], companyName: 'COMPANY 1' });
		expect(companies(allCompanies, newVisibilityAction).filter((company: Company) => company.isVisible)).toEqual([COMPANY1]);
	});
});
