import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Crypto from './../../models/Crypto';
import thunk from 'redux-thunk';
import CryptoPageContainer from './CryptoPage.container';
import * as cryptoActions from './../../actions/crypto.action';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const crypto: Crypto = new Crypto('Symbol', 'Crypto');
const store = mockStore({
	selectedCrypto: crypto
});
let component: ShallowWrapper<any, any>;

describe('Crypto Page Container Component', () => {
	beforeEach(() => {
		component = shallow(<CryptoPageContainer store={store} cryptoSymbol="Symbol" />);
	});

	it('should define the component', () => {
		expect(component).toBeDefined();
	});

	it('should init the selectedCrypto prop of the store', () => {
		expect(component.props().crypto).toEqual(crypto);
	});

	it('should define the fetchCrypto prop', () => {
		expect(typeof component.props().fetchCrypto).toEqual('function');
	});

	describe('fetchCrypto', () => {
		it('should dispatch the fetchCryptoThunk action', () => {
			const spy = spyOn(cryptoActions, 'fetchCryptoThunk').and.returnValue({ type: 'MOCKED_ACTION' });
			component.props().fetchCrypto();
			expect(spy).toHaveBeenCalled();
		});
	});
});
