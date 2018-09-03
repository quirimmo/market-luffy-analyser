import Company from './../models/Company';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { COMPANIES_RESOURCE_URL } from './../constants/constants';

export const FETCH_COMPANIES: string = 'FETCH_COMPANIES';
export const FETCH_COMPANIES_FULFILLED: string = 'FETCH_COMPANIES_FULFILLED';

export const fetchCompaniesFulfilled = (companies: Company[]) => ({ type: 'FETCH_COMPANIES_FULFILLED', companies });
export const fetchCompaniesEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		ofType(FETCH_COMPANIES),
		take(1),
		switchMap((action: any) =>
			ajax(COMPANIES_RESOURCE_URL).pipe(
				map((data: any) =>
					data.response.map((value: any) => new Company(value.symbol, value.name, value.lastSale, value.marketCap, value.sector, value.industry))
				),
				map((companies: Company[]) => fetchCompaniesFulfilled(companies))
			)
		)
	);
