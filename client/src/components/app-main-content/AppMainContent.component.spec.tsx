import * as React from 'react';
import { shallow } from 'enzyme';
import AppMainContent from './AppMainContent.component';
import CompaniesPage from '../companies/Companies.container';
import { Row, Col } from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router';
import HomePage from '../home/Home.container';
import CompanyPageContainer from '../company/CompanyPage.container';

let component: any;

describe('AppMainContent Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<AppMainContent />);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should define the public methods', () => {
		expect(typeof component.instance().getCompaniesPageRoute).toEqual('function');
		expect(typeof component.instance().getHomePageRoute).toEqual('function');
		expect(typeof component.instance().getCompanyPageRoute).toEqual('function');
	});

	it('should define the section element', () => {
		const sectionElement = component.find('section');
		expect(sectionElement).toHaveLength(1);
		expect(sectionElement.hasClass('main-content-section')).toBeTruthy();
	});

	it('should define the Row component', () => {
		expect(component.find(Row)).toHaveLength(1);
	});

	it('should define the Col component', () => {
		const col = component.find(Col);
		expect(col).toHaveLength(1);
		expect(col.hasClass('page-content-wrapper')).toBeTruthy();
	});

	it('should define the Switch component', () => {
		expect(component.find(Switch)).toHaveLength(1);
	});

	describe('Route', () => {
		it('should define the Route components', () => {
			expect(component.find(Route)).toHaveLength(4);
		});

		describe('home Route', () => {
			let homeRoute: any;
			beforeEach(() => {
				homeRoute = component.find(Route).at(0);
			});

			it('should define the path prop', () => {
				expect(homeRoute.prop('path')).toEqual('/home');
			});

			it('should define the render prop', () => {
				expect(homeRoute.prop('render')).toEqual(component.instance().getHomePageRoute);
			});
		});

		describe('companies Route', () => {
			let companiesRoute: any;
			beforeEach(() => {
				companiesRoute = component.find(Route).at(1);
			});

			it('should define the path prop', () => {
				expect(companiesRoute.prop('path')).toEqual('/companies');
			});

			it('should define the render prop', () => {
				expect(companiesRoute.prop('render')).toEqual(component.instance().getCompaniesPageRoute);
			});
		});

		describe('company page Route', () => {
			let companyPageRoute: any;
			beforeEach(() => {
				companyPageRoute = component.find(Route).at(2);
			});

			it('should define the path prop', () => {
				expect(companyPageRoute.prop('path')).toEqual('/company/:symbol');
			});

			it('should define the render prop', () => {
				expect(companyPageRoute.prop('render')).toEqual(component.instance().getCompanyPageRoute);
			});
		});

		describe('cryptos Route', () => {
			let cryptosRoute: any;
			beforeEach(() => {
				cryptosRoute = component.find(Route).at(3);
			});

			it('should define the path prop', () => {
				expect(cryptosRoute.prop('path')).toEqual('/cryptos');
			});

			it('should define the render prop', () => {
				expect(cryptosRoute.prop('render')).toEqual(component.instance().getCryptosPageRoute);
			});
		});
	});

	describe('Redirect', () => {
		let redirectComponent: any;
		beforeEach(() => {
			redirectComponent = component.find(Redirect);
		});

		it('should be defined', () => {
			expect(redirectComponent).toBeDefined();
		});

		it('should define the from prop', () => {
			expect(redirectComponent.prop('from')).toEqual('/');
		});

		it('should define the to prop', () => {
			expect(redirectComponent.prop('to')).toEqual('/home');
		});
	});

	describe('getCompaniesPageRoute', () => {
		it('should return the Companies Component', () => {
			expect(component.instance().getCompaniesPageRoute()).toEqual(<CompaniesPage />);
		});
	});

	describe('getHomePageRoute', () => {
		it('should return the Home Component', () => {
			expect(component.instance().getHomePageRoute()).toEqual(<HomePage />);
		});
	});

	describe('getCompanyPageRoute', () => {
		it('should return the CompanyPageContainer component', () => {
			expect(component.instance().getCompanyPageRoute({ match: { params: { symbol: 'symb' } } })).toEqual(
				<CompanyPageContainer companySymbol="symb" />
			);
		});
	});
});
