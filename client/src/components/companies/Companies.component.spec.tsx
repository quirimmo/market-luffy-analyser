import * as React from 'react';
import { shallow } from 'enzyme';
import Company from './../../models/Company';
import Companies from './Companies.component';
import CompanyCard from '../company/CompanyCard.component';

let component: any;
const company1: Company = new Company('Name 1', 'Symbol 1', 1, 2, 'Sector 1', 'Industry 1');
const company2: Company = new Company('Name 2', 'Symbol 2', 3, 4, 'Sector 2', 'Industry 2');
const companies: Company[] = [company1, company2];
const mockFetchCompanies = jest.fn();

describe('Companies Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<Companies companySectors={[]} companyName="" companies={companies} fetchCompanies={mockFetchCompanies} />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should define the public methods', () => {
		expect(typeof component.instance().componentDidMount).toEqual('function');
	});

	it('should init the companies prop', () => {
		expect(component.instance().props.companies).toEqual(companies);
	});

	it('should define the main div container and its css classes', () => {
		expect(component.find('.row.text-center')).toHaveLength(1);
	});

	it('should define a CompanyCard component for each company in the prop', () => {
		expect(component.find(CompanyCard)).toHaveLength(2);
	});

	describe('no companies prop case', () => {
		beforeEach(() => {
			component.setProps({ companies: [] });
		});
		afterEach(() => {
			component.setProps({ companies });
		});

		it('should not define any CompanyCard component', () => {
			expect(component.find(CompanyCard)).toHaveLength(0);
		});

		it('should define the companies-message element', () => {
			const companiesMessageElement = component.find('.companies-message');
			expect(companiesMessageElement).toHaveLength(1);
			expect(companiesMessageElement.text()).toEqual('Loading companies...');
		});
	});
});
