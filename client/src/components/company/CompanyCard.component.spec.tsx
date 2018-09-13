import * as React from 'react';
import { shallow } from 'enzyme';
import CompanyCard from './CompanyCard.component';
import Company from './../../models/Company';
import { Collapse, Button } from 'reactstrap';
import CompanyCardInfoRow from './CompanyCardInfoRow.component';

let component: any;
const company: Company = new Company('Symbol', 'Name', 1, 2, 'Sector', 'Industry');
const mockSelectCompany = jest.fn();

describe('Company Card Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<CompanyCard selectCompany={mockSelectCompany} company={company} />);
	});

	describe('Component', () => {
		it('should be defined', () => {
			expect(component).toBeDefined();
		});

		it('should define the public methods', () => {
			expect(typeof component.instance().toggle).toEqual('function');
		});

		it('should set the collapsed prop to false', () => {
			expect(component.state().collapsed).toBeFalsy();
		});

		it('should contain the article with class company-card', () => {
			const el = component.find('article');
			expect(el).toHaveLength(1);
			expect(el.hasClass('company-card')).toBeTruthy();
		});

		it('should contain the Collapse element with class company-card-details', () => {
			const el = component.find(Collapse);
			expect(el).toHaveLength(1);
			expect(el.hasClass('company-card-details')).toBeTruthy();
		});

		it('should define the 5 CompanyCardInfoRow components', () => {
			expect(component.find(CompanyCardInfoRow)).toHaveLength(5);
		});

		describe('Button', () => {
			let button: any;

			beforeEach(() => {
				button = component.find(Button);
			});

			it('should be defined with class company-button', () => {
				expect(button).toHaveLength(1);
				expect(button.hasClass('company-button')).toBeTruthy();
			});

			it('should have text as the company name', () => {
				expect(button.props().children).toEqual('Name');
			});
		});
	});

	describe('toggle', () => {
		it('should set the collapsed prop to true', () => {
			component.instance().toggle();
			expect(component.state().collapsed).toBeTruthy();
		});
	});
});
