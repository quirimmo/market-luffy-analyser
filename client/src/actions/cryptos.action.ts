import Crypto from './../models/Crypto';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import WebServiceProxy from './../services/WebServiceProxy';

export const FETCH_CRYPTOS: string = 'FETCH_CRYPTOS';
export const FETCH_CRYPTOS_FULFILLED: string = 'FETCH_CRYPTOS_FULFILLED';
// export const TOGGLE_COMPANY_VISIBILITY: string = 'TOGGLE_COMPANY_VISIBILITY';

export const fetchCryptosFulfilled = (cryptos: Crypto[]) => ({ type: FETCH_CRYPTOS_FULFILLED, cryptos });

export const fetchCryptosThunk = () => {
	return (dispatch: any) => {
		return fetchCryptos().pipe(map((cryptos: Crypto[]) => dispatch(fetchCryptosFulfilled(cryptos))));
	};
};

export const fetchCryptos = (): Observable<Crypto[]> => {
	return WebServiceProxy.getCryptos().pipe(take(1));
};

// export const toggleCompanyVisibility = (companyName: string, companySectors: string[]) => ({
// 	type: TOGGLE_COMPANY_VISIBILITY,
// 	companyName,
// 	companySectors
// });
