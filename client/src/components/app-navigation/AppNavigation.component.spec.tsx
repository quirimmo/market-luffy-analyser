import * as React from 'react';
import AppNavigation from "./AppNavigation.component";
import { shallow, ShallowWrapper } from 'enzyme';
import { Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';

let component: any;

describe('App Navigation Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<AppNavigation />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should define the nav element', () => {
		expect(component.find('nav')).toHaveLength(1);
	});

	it('should define the Row component', () => {
		expect(component.find(Row)).toHaveLength(1);
	});

	it('should define the Col component', () => {
		expect(component.find(Col)).toHaveLength(1);
	});

	describe('NavLink', () => {
		it('should define the NavLink components', () => {
			expect(component.find(NavLink)).toHaveLength(2);
		});

		it('should define the Home NavLink component', () => {
			const homeNavLink: ShallowWrapper = component.find(NavLink).at(0);
			expect(homeNavLink.prop('to')).toEqual('/home');
			expect(homeNavLink.children().text()).toEqual('Home');
		});

		it('should define the Companies NavLink component', () => {
			const companiesNavLink: ShallowWrapper = component.find(NavLink).at(1);
			expect(companiesNavLink.prop('to')).toEqual('/companies');
			expect(companiesNavLink.children().text()).toEqual('Companies');
		});
	});
});