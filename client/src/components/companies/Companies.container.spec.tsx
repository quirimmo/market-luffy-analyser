import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import CompaniesPage from './Companies.container';
import Company from './../../models/Company';
import thunk from 'redux-thunk';
import * as companyActions from './../../actions/company.action';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const company: Company = new Company('Symbol 1', 'Company 1', 1, 2, 'Sector 1', 'Industry 1');
const companies: Company[] = [company];
const store = mockStore({
	companies
});

let component: ShallowWrapper<any, any>;

describe('Companies Container Component', () => {
	beforeEach(() => {
		component = shallow(<CompaniesPage store={store} />);
	});

	it('should define the component', () => {
		expect(component).toBeDefined();
	});

	it('should init the companies prop of the store', () => {
		expect(component.props().companies).toEqual(companies);
	});

	it('should define the fetchCompanies prop', () => {
		expect(typeof component.props().selectCompany).toEqual('function');
	});

	describe('selectCompany', () => {
		it('should dispatch the selectCompany action', () => {
			const spy = spyOn(companyActions, 'selectCompany').and.returnValue({ type: 'MOCKED_ACTION' });
			component.props().selectCompany(company);
			expect(spy).toHaveBeenCalledWith(company);
		});
	});
});
