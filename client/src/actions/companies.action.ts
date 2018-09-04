import Company from './../models/Company';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Action } from 'redux';
import { ofType } from 'redux-observable';
import WebServiceProxy from './../services/WebServiceProxy';

export const FETCH_COMPANIES: string = 'FETCH_COMPANIES';
export const FETCH_COMPANIES_FULFILLED: string = 'FETCH_COMPANIES_FULFILLED';

export const fetchCompaniesFulfilled = (companies: Company[]) => ({ type: 'FETCH_COMPANIES_FULFILLED', companies });
export const fetchCompaniesEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		ofType(FETCH_COMPANIES),
		take(1),
		switchMap((action: any) => WebServiceProxy.getCompanies().pipe(map((companies: Company[]) => fetchCompaniesFulfilled(companies))))
	);
