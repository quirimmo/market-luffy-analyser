import Crypto from './../models/Crypto';
import { SELECT_CRYPTO } from './../actions/crypto.action';
import cryptoReducer from './crypto.reducer';

const NOT_EXISTENT_ACTION = {
	type: 'NOT_EXISTENT'
};
const crypto = new Crypto('Symbol', 'Crypto');
const SELECT_CRYPTO_ACTION = {
	type: SELECT_CRYPTO,
	crypto
};

describe('cryptoReducer', () => {
	it('should be defined', () => {
		expect(cryptoReducer).toBeDefined();
		expect(typeof cryptoReducer).toEqual('function');
	});

	it('should return the initial state if the action not exist', () => {
		expect(cryptoReducer(null, NOT_EXISTENT_ACTION)).toEqual(null);
	});

	it('should return the company', () => {
		expect(cryptoReducer(null, SELECT_CRYPTO_ACTION)).toEqual(crypto);
	});
});
