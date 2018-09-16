import * as React from 'react';
import { shallow } from 'enzyme';
import Company from './../../models/Company';
import Companies from './Companies.component';
import CompanyCard from '../company/CompanyCard.component';
import { of } from 'rxjs';
import { Alert } from 'reactstrap';
import FilterCompaniesPage from './FilterCompanies.container';
import SortCompanies from './SortCompanies.component';

let component: any;
const company1: Company = new Company('Symbol 2', 'Name 1', 1, 3, 'Sector 1', 'Industry 1');
const company2: Company = new Company('Symbol 1', 'Name 2', 2, 4, 'Sector 2', 'Industry 2');
company2.isVisible = false;
const companies: Company[] = [company1, company2];
const mockSelectCompany = jest.fn();

describe.only('Companies Presentational Component', () => {
	beforeEach(() => {
		component = shallow(
			<Companies selectCompany={mockSelectCompany} companySectors={[]} companies={companies} />
		);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should define the public methods', () => {
		expect(typeof component.instance().componentDidMount).toEqual('function');
		expect(typeof component.instance().sortCompanies).toEqual('function');
		expect(typeof component.instance().onMapCompany).toEqual('function');
	});

	describe('init', () => {
		it('should init the companies prop', () => {
			expect(component.instance().props.companies).toEqual(companies);
		});

		it('should init the state', () => {
			expect(component.state()).toEqual({
				sectors: ['Sector 1', 'Sector 2'],
				isLoading: false,
				isError: false
			});
		});
	});

	describe('render', () => {
		describe('error', () => {
			let alert: any;
			beforeEach(() => {
				component.setState({ isError: true });
				alert = component.find(Alert);
			});
			afterEach(() => {
				component.setState({ isError: false });
			});

			it('should display the Alert component', () => {
				expect(alert).toHaveLength(1);
			});

			it('should have the danger color prop', () => {
				expect(alert.props().color).toEqual('danger');
			});

			it('should display the text', () => {
				expect(alert.props().children).toEqual('Error fetching the companies');
			});

			it('should not display the other content', () => {
				expect(component.find('.loading-companies-message')).toHaveLength(0);
				expect(component.find('.no-companies-message')).toHaveLength(0);
				expect(component.find('.companies-section-wrapper')).toHaveLength(0);
			});
		});

		describe('loading', () => {
			let loading: any;
			beforeEach(() => {
				component.setState({ isLoading: true });
				loading = component.find('.loading-companies-message');
			});
			afterEach(() => {
				component.setState({ isLoading: false });
			});

			it('should display the loading companies element', () => {
				expect(loading).toHaveLength(1);
			});

			it('should display the loading companies message', () => {
				expect(loading.text()).toEqual('Loading companies...');
			});

			it('should not display the other content', () => {
				expect(component.find(Alert)).toHaveLength(0);
				expect(component.find('.no-companies-message')).toHaveLength(0);
				expect(component.find('.companies-section-wrapper')).toHaveLength(0);
			});
		});

		describe('no results', () => {
			let noResults: any;
			beforeEach(() => {
				component.setProps({ companies: [] });
				noResults = component.find('.no-companies-message');
			});
			afterEach(() => {
				component.setProps({ companies });
			});

			it('should display the no companies element', () => {
				expect(noResults).toHaveLength(1);
			});

			it('should display the no companies message', () => {
				expect(noResults.text()).toEqual('There are no companies');
			});

			it('should not display the other content', () => {
				expect(component.find(Alert)).toHaveLength(0);
				expect(component.find('.loading-companies-message')).toHaveLength(0);
				expect(component.find('.companies-section-wrapper')).toHaveLength(0);
			});
		});

		describe('results', () => {
			let results: any;
			beforeEach(() => {
				results = component.find('.companies-section-wrapper');
			});

			it('should display the results container', () => {
				expect(results).toHaveLength(1);
			});

			it('should display the FilterCompaniesPage component', () => {
				expect(results.find(FilterCompaniesPage)).toHaveLength(1);
			});

			it('should pass the sectors as prop of the FilterCompaniesPage', () => {
				expect(results.find(FilterCompaniesPage).props().sectors).toEqual(['Sector 1', 'Sector 2']);
			});

			it('should display the SortCompanies component', () => {
				expect(results.find(SortCompanies)).toHaveLength(1);
			});

			it('should pass the sortCompanies method as prop of the SortCompanies', () => {
				expect(results.find(SortCompanies).props().sortCompanies).toEqual(component.instance().sortCompanies);
			});

			it('should define a CompanyCard component for each visible company in the prop', () => {
				expect(component.find(CompanyCard)).toHaveLength(1);
				expect(component.find(CompanyCard).props().company).toEqual(company1);
			});
		});
	});

	describe('onMapCompany', () => {
		it('should return undefined if the company is not visible', () => {
			expect(component.instance().onMapCompany(company2)).toBeUndefined();
		});

		it('should return the company list element if the company is visible', () => {
			expect(component.instance().onMapCompany(company1)).toEqual(
				<div className="col-lg-3 col-md-4 col-sm-6" key={company1.symbol}>
					<CompanyCard selectCompany={mockSelectCompany} company={company1} />
				</div>
			);
		});
	});

	describe('sortCompanies', () => {
		beforeEach(() => {
			company2.isVisible = true;
		});
		afterEach(() => {
			company2.isVisible = false;
		});

		it('should call the forceUpdate method', () => {
			const spy = spyOn(component.instance(), 'forceUpdate');
			component.instance().sortCompanies();
			expect(spy).toHaveBeenCalled();
		});

		it('should sort the companies by name', () => {
			component.instance().sortCompanies('NAME');
			expect(component.instance().props.companies).toEqual(companies);
		});

		it('should sort the companies by symbol', () => {
			component.instance().sortCompanies('SYMBOL');
			expect(component.instance().props.companies).toEqual([company2, company1]);
		});

		it('should sort the companies by marketCap', () => {
			component.instance().sortCompanies('MARKET CAP');
			expect(component.instance().props.companies).toEqual([company2, company1]);
		});

		it('should sort the companies by sector', () => {
			component.instance().sortCompanies('SECTOR');
			expect(component.instance().props.companies).toEqual(companies);
		});
	});
});
