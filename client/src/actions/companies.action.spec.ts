jest.mock('rxjs/ajax', () => {
	return {
		ajax: () => {
			return of({ response: companies });
		}
	};
});

import { FETCH_COMPANIES, FETCH_COMPANIES_FULFILLED, fetchCompaniesFulfilled, fetchCompaniesEpic } from './companies.action';
import Company from './../models/Company';
import { of } from 'rxjs';
import { ActionsObservable } from 'redux-observable';

const company1: Company = new Company('Symbol 1', 'Name 1', 1, 2, 'Sector 1', 'Industry 1');
const company2: Company = new Company('Symbol 2', 'Name 2', 3, 4, 'Sector 2', 'Industry 2');
const companies: Company[] = [company1, company2];

describe('companies action', () => {
	it('should define the action types', () => {
		expect(FETCH_COMPANIES).toEqual('FETCH_COMPANIES');
		expect(FETCH_COMPANIES_FULFILLED).toEqual('FETCH_COMPANIES_FULFILLED');
	});

	it('should define the actions', () => {
		expect(typeof fetchCompaniesFulfilled).toEqual('function');
		expect(typeof fetchCompaniesEpic).toEqual('function');
	});

	describe('fetchCompaniesFulfilled', () => {
		it('should return the action', () => {
			expect(fetchCompaniesFulfilled(companies)).toEqual({
				type: FETCH_COMPANIES_FULFILLED,
				companies
			});
		});
	});

	describe('fetchCompaniesEpic', () => {
		it('should return the action', () => {
			const action$ = ActionsObservable.of({ type: FETCH_COMPANIES });

			return fetchCompaniesEpic(action$)
				.toPromise()
				.then(actionReceived => {
					expect(actionReceived).toEqual({
						type: FETCH_COMPANIES_FULFILLED,
						companies
					});
				});
		});
	});
});
