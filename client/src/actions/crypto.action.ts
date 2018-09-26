import Company from './../models/Company';
import { Observable, Observer } from 'rxjs';
import WebServiceProxy from './../services/WebServiceProxy';
import { map } from 'rxjs/operators';
import DailySerie from './../models/DailySerie';
import Crypto from './../models/Crypto';

export const SELECT_CRYPTO: string = 'SELECT_CRYPTO';

export const selectCrypto = (crypto: Crypto) => ({ type: SELECT_CRYPTO, crypto });

export const fetchCryptoThunk = (cryptoSymbol: string) => {
	return (dispatch: any, getState: any) => {
		return new Observable((observer: Observer<boolean>) => {
			const stateCryptos = getState().cryptos;
			const crypto = stateCryptos.find((currentCrypto: Crypto) => currentCrypto.symbol === cryptoSymbol);
			if (typeof crypto === 'undefined') {
				observer.error(`There is no crypto corresponding to the given symbol ${cryptoSymbol}`);
				observer.complete();
			} else {
				WebServiceProxy.getCryptoPricesInfo(crypto.symbol)
					.pipe(map(onMap.bind(null, crypto)))
					.subscribe(onSubscribe.bind(null, observer, crypto, dispatch), onError.bind(null, observer), onComplete.bind(null, observer));
			}
		});
	};

	function onMap(crypto: Crypto, resp: any) {
		crypto.dailySerie = new DailySerie(
			crypto.symbol,
			resp.response.data[cryptoSymbol].lastMovement,
			resp.response.data[cryptoSymbol].priceChange,
			resp.response.data[cryptoSymbol].trend
		);
		crypto.dailySerie.buildDailyTimes(resp.response.data[cryptoSymbol].prices);
		return crypto;
	}

	function onSubscribe(observer: Observer<boolean>, crypto: Crypto, dispatch: any) {
		dispatch(selectCrypto(crypto));
		observer.next(true);
	}

	function onError(observer: Observer<boolean>, err: any) {
		observer.error(`Error fetching data for the crypto ${cryptoSymbol}`);
	}

	function onComplete(observer: Observer<boolean>) {
		observer.complete();
	}
};
