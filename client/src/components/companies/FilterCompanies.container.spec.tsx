import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import FilterCompaniesPage from './FilterCompanies.container';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const sectors: string[] = ['Sector 1', 'Sector 2'];
const store = mockStore({
	sectors
});

let component: ShallowWrapper<any, any>;

describe('FilterCompanies Container Component', () => {
	beforeEach(() => {
		component = shallow(<FilterCompaniesPage store={store} sectors={sectors} />);
	});

	it('should define the component', () => {
		expect(component).toBeDefined();
	});

	it('should init the sectors prop', () => {
		expect(component.props().sectors).toEqual(sectors);
	});

	it('should define the toggleCompanyVisibility prop', () => {
		expect(typeof component.props().toggleCompanyVisibility).toEqual('function');
	});

	describe('toggleCompanyVisibility', () => {
		it('should dispatch the TOGGLE_COMPANY_VISIBILITY action', () => {
			const expectedAction = { type: 'TOGGLE_COMPANY_VISIBILITY', companyName: 'name', companySectors: sectors };
			component.props().toggleCompanyVisibility('name', sectors);
			expect(store.getActions()).toContainEqual(expectedAction);
		});
	});
});
