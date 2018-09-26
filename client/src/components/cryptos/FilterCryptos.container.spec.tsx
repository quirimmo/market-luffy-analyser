import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import FilterCryptosPage from './FilterCryptos.container';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

let component: ShallowWrapper<any, any>;

describe('FilterCryptos Container Component', () => {
	beforeEach(() => {
		component = shallow(<FilterCryptosPage store={store} />);
	});

	it('should define the component', () => {
		expect(component).toBeDefined();
	});

	it('should define the toggleCryptoVisibility prop', () => {
		expect(typeof component.props().toggleCryptoVisibility).toEqual('function');
	});

	describe('toggleCryptoVisibility', () => {
		it('should dispatch the TOGGLE_CRYPTO_VISIBILITY action', () => {
			const expectedAction = { type: 'TOGGLE_CRYPTO_VISIBILITY', cryptoName: 'name' };
			component.props().toggleCryptoVisibility('name');
			expect(store.getActions()).toContainEqual(expectedAction);
		});
	});
});
