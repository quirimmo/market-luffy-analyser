import Company from './../models/Company';
import { Observable, Observer, of } from 'rxjs';
import { fetchCompaniesThunk } from './companies.action';
import WebServiceProxy from './../services/WebServiceProxy';
import { map } from 'rxjs/operators';
import DailySerie from './../models/DailySerie';

export const SELECT_COMPANY: string = 'SELECT_COMPANY';
export const FETCH_COMPANY: string = 'FETCH_COMPANY';

export const selectCompany = (company: Company | null) => ({ type: SELECT_COMPANY, company });

export const fetchCompanyThunk = (companySymbol: string) => {
	return (dispatch: any, getState: any) => {
		return new Observable((observer: Observer<boolean>) => {
			const stateCompanies = getState().companies;
			if (stateCompanies.length === 0) {
				dispatch(fetchCompaniesThunk()).subscribe((data: any) => {
					complete(data.companies, observer).subscribe((company: Company | null) => {
						dispatch(selectCompany(company));
						observer.next(true);
						observer.complete();
					});
				});
			} else {
				complete(stateCompanies, observer).subscribe((company: Company | null) => {
					dispatch(selectCompany(company));
					observer.next(true);
					observer.complete();
				});
			}
		});

		function complete(companies: Company[], observer: Observer<boolean>): Observable<Company | null> {
			const company = companies.find((el: Company) => el.symbol === companySymbol) || null;
			if (company !== null) {
				return WebServiceProxy.getCompanyPricesInfo(company.symbol, true).pipe(
					map((resp: any) => {
						company.dailySerie = new DailySerie(
							company.symbol,
							resp.response.data[companySymbol].lastMovement,
							resp.response.data[companySymbol].priceChange,
							resp.response.data[companySymbol].trend
						);
						return company;
					})
				);
			}
			return of(company);
		}
	};
};
