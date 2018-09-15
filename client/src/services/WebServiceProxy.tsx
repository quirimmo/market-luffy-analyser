import Company from './../models/Company';
import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { COMPANIES_RESOURCE_URL, PRICES_RESOURCE_URL } from './../constants/constants';
import { map } from 'rxjs/operators';
import DailySerie from './..//models/DailySerie';

class WebServiceProxy {
	public static getCompanies(): Observable<Company[]> {
		return ajax(COMPANIES_RESOURCE_URL).pipe(
			map((data: any) =>
				data.response.map((value: any) => new Company(value.symbol, value.name, value.lastSale, value.marketCap, value.sector, value.industry))
			)
		);
	}

	public static getCompanyPricesInfo(symbol: string, isCompact: boolean = true) {
		const size: string = isCompact ? 'compact' : 'full';
		return ajax(`${PRICES_RESOURCE_URL}${symbol}/${size}`);
		// return ajax(PRICES_RESOURCE_URL).pipe(
		// 	map((data: any) =>
		// 		data.response.map((value: any) => new Company(value.symbol, value.name, value.lastSale, value.marketCap, value.sector, value.industry))
		// 	)
		// );
	}
}

export default WebServiceProxy;
