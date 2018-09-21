import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Company from './../../models/Company';
import DailySerie from './../../models/DailySerie';
import CompanyPage from './CompanyPage.component';
import { of, Observable, Observer } from 'rxjs';
import CompanyDetails from './CompanyDetails.component';
import LoadingGears from '../shared/LoadingGears.component';
import { Alert } from 'reactstrap';

const company: Company = new Company('Symbol', 'Name', 0, 1, 'Sector', 'Industry');
company.dailySerie = new DailySerie('Symbol', 1, [2, 3], 4);
const mockFetchCompany = jest.fn(() => of(null));
let component: any;

describe('CompanyPage', () => {
	beforeEach(() => {
		component = shallow(<CompanyPage companies={[]} company={company} fetchCompany={mockFetchCompany} />);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should expose the public methods', () => {
		expect(typeof component.instance().getLoadingContent).toEqual('function');
		expect(typeof component.instance().getErrorContent).toEqual('function');
		expect(typeof component.instance().getCompanyContent).toEqual('function');
	});

	it('should init the state', () => {
		expect(component.state().isError).toBeFalsy();
		expect(component.state().isLoading).toBeFalsy();
	});

	describe('render', () => {
		it('should display the CompanyDetails component', () => {
			const companyDetails = component.find(CompanyDetails);
			expect(companyDetails).toHaveLength(1);
			expect(companyDetails.props().company).toEqual(company);
		});

		it('should not display the loading content', () => {
			expect(component.find(LoadingGears)).toHaveLength(0);
		});

		it('should not display the error content', () => {
			expect(component.find(Alert)).toHaveLength(0);
		});
	});

	describe('getLoadingContent', () => {
		it('should return the LoadingGears component', () => {
			expect(component.instance().getLoadingContent()).toEqual(<LoadingGears imgClasses="mt-5" />);
		});
	});

	describe('getErrorContent', () => {
		it('should return the Alert component', () => {
			expect(component.instance().getErrorContent()).toEqual(<Alert color="danger">Error retrieving the company</Alert>);
		});
	});

	describe('getCompanyContent', () => {
		it('should return the CompanyDetails component', () => {
			const companyContent = mount(component.instance().getCompanyContent());
			const companyDetails = companyContent.find(CompanyDetails);
			expect(companyDetails).toHaveLength(1);
			expect(companyDetails.props().company).toEqual(company);
		});
	});

	describe('componentDidMount', () => {
		it('should call twice the setState method', () => {
			const spy = spyOn(component, 'setState');
			component.instance().componentDidMount();
			expect(spy).toHaveBeenCalledTimes(2);
		});

		it('should call the fetchCompany method', () => {
			component.instance().componentDidMount();
			expect(mockFetchCompany).toHaveBeenCalled();
		});

		it('should keep the isError to false and isLoading to false', () => {
			component.instance().componentDidMount();
			expect(component.state().isError).toBeFalsy();
			expect(component.state().isLoading).toBeFalsy();
		});

		describe('error', () => {
			let spy: any;
			let mockFetchCompanyError: any;

			beforeEach(() => {
				spy = spyOn(console, 'error');
				mockFetchCompanyError = jest.fn(() => {
					const observable = new Observable((observer: Observer<boolean>) => {
						observer.error('ERROR');
					});
					return observable;
				});
			});

			it('should log the error', () => {
				shallow(<CompanyPage companies={[]} company={company} fetchCompany={mockFetchCompanyError} />);
				expect(spy).toHaveBeenCalledWith('Error fetching the company', 'ERROR', company);
			});

			it('should set the isError prop of the state to true', () => {
				const comp: any = shallow(<CompanyPage companies={[]} company={company} fetchCompany={mockFetchCompanyError} />);
				expect(comp.state().isError).toBeTruthy();
			});
		});
	});
});
