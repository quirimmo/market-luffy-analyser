import * as React from 'react';
import { shallow } from 'enzyme';
import { CompanyCard } from './CompanyCard.component';
import Company from './../../models/Company';
import { withRouter } from 'react-router-dom';
import { Collapse, Button } from 'reactstrap';
import CompanyCardInfoRow from './CompanyCardInfoRow.component';

let component: any;
const company: Company = new Company('Symbol', 'Name', 1, 2, 'Sector', 'Industry');
const mockSelectCompany = jest.fn();
const match: any = {};
const location: any = {};
const mockHistoryPush = jest.fn();
const history: any = {
	push: mockHistoryPush
};

describe('Company Card Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<CompanyCard selectCompany={mockSelectCompany} company={company} match={match} location={location} history={history} />);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should define the public methods', () => {
		expect(typeof component.instance().toggle).toEqual('function');
		expect(typeof component.instance().openCompanyPage).toEqual('function');
	});

	it('should init the state', () => {
		expect(component.state().collapsed).toBeFalsy();
	});

	describe('render', () => {
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

		it('should display the 5 CompanyCardInfoRow components', () => {
			expect(component.find(CompanyCardInfoRow)).toHaveLength(5);
		});

		describe('Button', () => {
			let button: any;
			let companyPageButton: any;

			beforeEach(() => {
				button = component.find('.company-button');
				companyPageButton = component.find('.company-page-button');
			});

			describe('toggle button', () => {
				it('should be displayed', () => {
					expect(button).toHaveLength(1);
				});

				it('should have text as the company name', () => {
					expect(button.props().children).toEqual('Name');
				});
			});

			describe('company page button', () => {
				it('should be displayed', () => {
					expect(companyPageButton).toHaveLength(1);
				});

				it('should have text as the company name', () => {
					expect(companyPageButton.props().children).toEqual('Company Page');
				});
			});
		});
	});

	describe('toggle', () => {
		it('should set the collapsed prop to true', () => {
			component.instance().toggle();
			expect(component.state().collapsed).toBeTruthy();
		});
	});

	describe('openCompanyPage', () => {
		it('should call the selectCompany method', () => {
			component.instance().openCompanyPage();
			expect(mockSelectCompany).toHaveBeenCalledWith(company);
		});

		it('should call the history push', () => {
			component.instance().openCompanyPage();
			expect(mockHistoryPush).toHaveBeenCalledWith('/company/Symbol');
		});
	});
});
