import * as React from 'react';
import AppNavigation from './AppNavigation.component';
import { shallow, ShallowWrapper } from 'enzyme';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

let component: any;

describe('App Navigation Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<AppNavigation />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should set the isMenuOpen to false', () => {
		expect(component.state().isMenuOpen).toBeFalsy();
	});

	it('should define the nav element', () => {
		expect(component.find('nav')).toHaveLength(1);
	});

	describe('Menu Component', () => {
		let menu: any;
		beforeEach(() => {
			menu = component.find(Menu);
		});

		it('should be defined', () => {
			expect(menu).toHaveLength(1);
		});

		it('should have isOpen prop to false by default', () => {
			expect(menu.props().isOpen).toBeFalsy();
		});
	});

	describe('NavLink', () => {
		it('should define the NavLink components', () => {
			expect(component.find(NavLink)).toHaveLength(3);
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

		it('should define the Cryptos NavLink component', () => {
			const companiesNavLink: ShallowWrapper = component.find(NavLink).at(2);
			expect(companiesNavLink.prop('to')).toEqual('/cryptos');
			expect(companiesNavLink.children().text()).toEqual('Cryptos');
		});
	});
});
