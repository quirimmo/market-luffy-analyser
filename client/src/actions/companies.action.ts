import Company from './../models/Company';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import WebServiceProxy from './../services/WebServiceProxy';

export const FETCH_COMPANIES: string = 'FETCH_COMPANIES';
export const FETCH_COMPANIES_FULFILLED: string = 'FETCH_COMPANIES_FULFILLED';

export const fetchCompaniesFulfilled = (companies: Company[]) => ({ type: 'FETCH_COMPANIES_FULFILLED', companies });

export const fetchCompaniesThunk = () => {
	return (dispatch: any) => {
		return fetchCompanies().pipe(map((companies: Company[]) => dispatch(fetchCompaniesFulfilled(companies))));
	};
};

export const fetchCompanies = (): Observable<any> => {
	return WebServiceProxy.getCompanies().pipe(take(1));
};
