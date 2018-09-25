import Company from './../models/Company';
import { Observable, Observer, of } from 'rxjs';
import WebServiceProxy from './../services/WebServiceProxy';
import { map, delay } from 'rxjs/operators';
import DailySerie from './../models/DailySerie';

export const SELECT_COMPANY: string = 'SELECT_COMPANY';

export const selectCompany = (company: Company) => ({ type: SELECT_COMPANY, company });

export const fetchCompanyThunk = (companySymbol: string) => {
	return (dispatch: any, getState: any) => {
		return new Observable((observer: Observer<boolean>) => {
			const stateCompanies = getState().companies;
			const company = stateCompanies.find((comp: Company) => comp.symbol === companySymbol);
			if (typeof company === 'undefined') {
				observer.error(`There is no company corresponding to the given symbol ${companySymbol}`);
				observer.complete();
			} else {
				WebServiceProxy.getCompanyPricesInfo(company.symbol, false)
					.pipe(map(onMap.bind(null, company)))
					.subscribe(onSubscribe.bind(null, observer, company, dispatch), onError.bind(null, observer), onComplete.bind(null, observer));
			}
		});
	};

	function onMap(company: Company, resp: any) {
		company.dailySerie = new DailySerie(
			company.symbol,
			resp.response.data[companySymbol].lastMovement,
			resp.response.data[companySymbol].priceChange,
			resp.response.data[companySymbol].trend
		);
		company.dailySerie.buildDailyTimes(resp.response.data[companySymbol].prices);
		return company;
	}

	function onSubscribe(observer: Observer<boolean>, company: Company, dispatch: any) {
		dispatch(selectCompany(company));
		observer.next(true);
	}

	function onError(observer: Observer<boolean>, err: any) {
		observer.error(`Error fetching data for the company ${companySymbol}`);
	}

	function onComplete(observer: Observer<boolean>) {
		observer.complete();
	}
};
