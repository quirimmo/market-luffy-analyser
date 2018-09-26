import Crypto from './../models/Crypto';
import { FETCH_CRYPTOS_FULFILLED, TOGGLE_CRYPTO_VISIBILITY } from './../actions/cryptos.action';

const cryptos = (state: Crypto[] = [], action: any): Crypto[] => {
	switch (action.type) {
		case FETCH_CRYPTOS_FULFILLED:
			return [...action.cryptos];
		case TOGGLE_CRYPTO_VISIBILITY:
			return state.map(toggleCryptoVisibility);
		default:
			return state;
	}

	function toggleCryptoVisibility(crypto: Crypto) {
		crypto.isVisible = crypto.name.toUpperCase().includes(action.cryptoName) || crypto.symbol.toUpperCase().includes(action.cryptoName);
		return crypto;
	}
};

export default cryptos;
