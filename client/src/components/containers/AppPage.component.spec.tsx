import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import AppPage from './AppPage.component';
import Company from './../../models/Company';

const mockStore = configureMockStore();
const company: Company = new Company('Symbol 1');
const companies: Company[] = [company];
const store = mockStore({
	companies: [new Company('Symbol 1')]
});
let component: ShallowWrapper<any, any>;

describe('App Container Component', () => {
	beforeEach(() => {
		component = shallow(<AppPage store={store} />);
	});

	it('should define the component', () => {
		expect(component).toBeDefined();
	});

	it('should define the companies data in the state', () => {
		expect(component.props().store.getState().companies).toEqual(companies);
	});
});