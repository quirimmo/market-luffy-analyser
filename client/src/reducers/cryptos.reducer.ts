import Crypto from './../models/Crypto';
import { FETCH_CRYPTOS_FULFILLED } from './../actions/cryptos.action';

const cryptos = (state: Crypto[] = [], action: any): Crypto[] => {
	switch (action.type) {
		case FETCH_CRYPTOS_FULFILLED:
			return [...action.cryptos];
		default:
			return state;
	}
};

export default cryptos;
