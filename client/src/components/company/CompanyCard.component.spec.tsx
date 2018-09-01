import * as React from 'react';
import { shallow } from 'enzyme';
import CompanyCard from './CompanyCard.component';
import Company from './../../models/Company';

let component: any;
const company: Company = new Company('Name', 'Symbol', 1, 2, 'Sector', 'Industry');

describe('Company Card Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<CompanyCard company={company} />);
	});

	describe('Component', () => {
		it('should be defined', () => {
			expect(component).toBeDefined();
		});

		it('should define the public methods', () => {
			expect(typeof component.instance().toggle).toEqual('function');
		});

		// it('should contain the BrowserRouter', () => {
		// 	expect(component.find(BrowserRouter)).toHaveLength(1);
		// });

		// it('should contain the Container with the CSS class', () => {
		// 	const containerComponent = component.find(Container);
		// 	expect(containerComponent).toHaveLength(1);
		// 	expect(containerComponent.hasClass('main-app-wrapper')).toBeTruthy();
		// });
	});
});
