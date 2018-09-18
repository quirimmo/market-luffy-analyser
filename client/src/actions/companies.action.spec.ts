jest.mock('rxjs/ajax', () => {
	return {
		ajax: () => {
			return of({ response: companies });
		}
	};
});

import * as companiesActions from './companies.action';
// import {
// 	FETCH_COMPANIES,
// 	FETCH_COMPANIES_FULFILLED,
// 	TOGGLE_COMPANY_VISIBILITY,
// 	fetchCompaniesFulfilled,
// 	fetchCompanies,
// 	toggleCompanyVisibility,
// 	fetchCompaniesThunk
// } from './companies.action';
import Company from './../models/Company';
import { of } from 'rxjs';
import WebServiceProxy from './../services/WebServiceProxy';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const company1: Company = new Company('Symbol 1', 'Name 1', 1, 2, 'Sector 1', 'Industry 1');
const company2: Company = new Company('Symbol 2', 'Name 2', 3, 4, 'Sector 2', 'Industry 2');
const companies: Company[] = [company1, company2];
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('companies action', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should define the action types', () => {
		expect(companiesActions.FETCH_COMPANIES).toEqual('FETCH_COMPANIES');
		expect(companiesActions.FETCH_COMPANIES_FULFILLED).toEqual('FETCH_COMPANIES_FULFILLED');
	});

	it('should define the actions', () => {
		expect(typeof companiesActions.fetchCompaniesFulfilled).toEqual('function');
		expect(typeof companiesActions.fetchCompaniesThunk).toEqual('function');
		expect(typeof companiesActions.fetchCompanies).toEqual('function');
		expect(typeof companiesActions.toggleCompanyVisibility).toEqual('function');
	});

	describe('fetchCompaniesFulfilled', () => {
		it('should return the action', () => {
			expect(companiesActions.fetchCompaniesFulfilled(companies)).toEqual({
				type: companiesActions.FETCH_COMPANIES_FULFILLED,
				companies
			});
		});
	});

	describe('fetchCompaniesThunk', () => {
		it('should call the fetchCompanies action', () => {
			const spy = spyOn(companiesActions, 'fetchCompanies').and.returnValue(of(companies));
			const store = mockStore({});
			companiesActions.fetchCompaniesThunk()(store.dispatch);
			expect(spy).toHaveBeenCalled();
		});

		it('should return the FETCH_COMPANIES_FULFILLED action with the given companies', (done: any) => {
			const spy = spyOn(companiesActions, 'fetchCompanies').and.returnValue(of(companies));
			const store = mockStore({});
			companiesActions
				.fetchCompaniesThunk()(store.dispatch)
				.subscribe((data: any) => {
					expect(data).toEqual({ type: companiesActions.FETCH_COMPANIES_FULFILLED, companies });
					done();
				});
		});
	});

	describe('fetchCompanies', () => {
		it('should call the getCompanies method of WebServiceProxy', () => {
			const spy = spyOn(WebServiceProxy, 'getCompanies').and.returnValue(of(companies));
			companiesActions.fetchCompanies();
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('toggleCompanyVisibility', () => {
		it('should return the TOGGLE_COMPANY_VISIBILITY action with the right parameters', () => {
			expect(companiesActions.toggleCompanyVisibility('name', ['secto1', 'sector2'])).toEqual({
				type: companiesActions.TOGGLE_COMPANY_VISIBILITY,
				companyName: 'name',
				companySectors: ['secto1', 'sector2']
			});
		});
	});

	// describe('fetchCompaniesEpic', () => {
	// 	it('should return the action', () => {
	// 		const action$ = ActionsObservable.of({ type: FETCH_COMPANIES });

	// 		return fetchCompaniesEpic(action$)
	// 			.toPromise()
	// 			.then(actionReceived => {
	// 				expect(actionReceived).toEqual({
	// 					type: FETCH_COMPANIES_FULFILLED,
	// 					companies
	// 				});
	// 			});
	// 	});
	// });
});
