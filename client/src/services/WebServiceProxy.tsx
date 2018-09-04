import Company from './../models/Company';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { COMPANIES_RESOURCE_URL } from './../constants/constants';
import { map } from 'rxjs/operators';

class WebServiceProxy {
	public static getCompanies(): Observable<Company[]> {
		return ajax(COMPANIES_RESOURCE_URL).pipe(
			map((data: any) =>
				data.response.map((value: any) => new Company(value.symbol, value.name, value.lastSale, value.marketCap, value.sector, value.industry))
			)
		);
	}
}

export default WebServiceProxy;
