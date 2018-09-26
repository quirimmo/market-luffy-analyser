import Crypto from './../models/Crypto';
import { SELECT_CRYPTO } from './../actions/crypto.action';

const selectedCrypto = (state: Crypto | null = null, action: any): Crypto | null => {
	switch (action.type) {
		case SELECT_CRYPTO:
			return action.crypto;
		default:
			return state;
	}
};

export default selectedCrypto;
