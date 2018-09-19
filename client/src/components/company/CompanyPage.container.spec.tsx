import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Company from './../../models/Company';
import thunk from 'redux-thunk';
import CompanyPageContainer from './CompanyPage.container';
import * as companyActions from './../../actions/company.action';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const company: Company = new Company('Symbol', 'Company', 1, 2, 'Sector', 'Industry');
const store = mockStore({
	selectedCompany: company
});
let component: ShallowWrapper<any, any>;

describe('Companies Page Container Component', () => {
	beforeEach(() => {
		component = shallow(<CompanyPageContainer store={store} companySymbol="Symbol" />);
	});

	it('should define the component', () => {
		expect(component).toBeDefined();
	});

	it('should init the selectedCompany prop of the store', () => {
		expect(component.props().company).toEqual(company);
	});

	it('should define the fetchCompany prop', () => {
		expect(typeof component.props().fetchCompany).toEqual('function');
	});

	describe('fetchCompany', () => {
		it('should dispatch the fetchCompanyThunk action', () => {
			const spy = spyOn(companyActions, 'fetchCompanyThunk').and.returnValue({ type: 'MOCKED_ACTION' });
			component.props().fetchCompany();
			expect(spy).toHaveBeenCalled();
		});
	});
});
