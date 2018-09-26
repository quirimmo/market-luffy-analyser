import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import CryptosPageContainer from './Cryptos.container';
import Crypto from './../../models/Crypto';
import thunk from 'redux-thunk';
import * as cryptoActions from './../../actions/crypto.action';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const crypto: Crypto = new Crypto('Symbol 1', 'Company 1');
const cryptos: Crypto[] = [crypto];
const store = mockStore({
	cryptos
});

let component: ShallowWrapper<any, any>;

describe('Cryptos Container Component', () => {
	beforeEach(() => {
		component = shallow(<CryptosPageContainer store={store} />);
	});

	it('should define the component', () => {
		expect(component).toBeDefined();
	});

	it('should init the companies prop of the store', () => {
		expect(component.props().cryptos).toEqual(cryptos);
	});

	it('should define the selectCrypto prop', () => {
		expect(typeof component.props().selectCrypto).toEqual('function');
	});

	describe('selectCrypto', () => {
		it('should dispatch the selectCrypto action', () => {
			const spy = spyOn(cryptoActions, 'selectCrypto').and.returnValue({ type: 'MOCKED_ACTION' });
			component.props().selectCrypto(crypto);
			expect(spy).toHaveBeenCalledWith(crypto);
		});
	});
});
