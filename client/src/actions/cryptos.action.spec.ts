jest.mock('rxjs/ajax', () => {
	return {
		ajax: () => {
			return of({ response: cryptos });
		}
	};
});

import * as cryptosActions from './cryptos.action';
import Crypto from './../models/Crypto';
import { of } from 'rxjs';
import WebServiceProxy from './../services/WebServiceProxy';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const crypto1: Crypto = new Crypto('Symbol 1', 'Name 1');
const crypto2: Crypto = new Crypto('Symbol 2', 'Name 2');
const cryptos: Crypto[] = [crypto1, crypto2];
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cryptos action', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should define the action types', () => {
		expect(cryptosActions.FETCH_CRYPTOS).toEqual('FETCH_CRYPTOS');
		expect(cryptosActions.FETCH_CRYPTOS_FULFILLED).toEqual('FETCH_CRYPTOS_FULFILLED');
	});

	it('should define the actions', () => {
		expect(typeof cryptosActions.fetchCryptosFulfilled).toEqual('function');
		expect(typeof cryptosActions.fetchCryptosThunk).toEqual('function');
		expect(typeof cryptosActions.fetchCryptos).toEqual('function');
	});

	describe('fetchCryptosFulfilled', () => {
		it('should return the action', () => {
			expect(cryptosActions.fetchCryptosFulfilled(cryptos)).toEqual({
				type: cryptosActions.FETCH_CRYPTOS_FULFILLED,
				cryptos
			});
		});
	});

	describe('fetchCryptosThunk', () => {
		it('should call the fetchCryptos action', () => {
			const spy = spyOn(cryptosActions, 'fetchCryptos').and.returnValue(of(cryptos));
			const store = mockStore({});
			cryptosActions.fetchCryptosThunk()(store.dispatch);
			expect(spy).toHaveBeenCalled();
		});

		it('should return the FETCH_CRYPTOS_FULFILLED action with the given cryptos', (done: any) => {
			const spy = spyOn(cryptosActions, 'fetchCryptos').and.returnValue(of(cryptos));
			const store = mockStore({});
			cryptosActions
				.fetchCryptosThunk()(store.dispatch)
				.subscribe((data: any) => {
					expect(data).toEqual({ type: cryptosActions.FETCH_CRYPTOS_FULFILLED, cryptos });
					done();
				});
		});
	});

	describe('fetchCryptos', () => {
		it('should call the getCryptos method of WebServiceProxy', () => {
			const spy = spyOn(WebServiceProxy, 'getCryptos').and.returnValue(of(cryptos));
			cryptosActions.fetchCryptos();
			expect(spy).toHaveBeenCalled();
		});
	});
});
