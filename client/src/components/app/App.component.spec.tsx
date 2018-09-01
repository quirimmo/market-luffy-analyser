import * as React from 'react';
import { shallow } from 'enzyme';
import App from './App.component';
import Company from './../../models/Company';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'reactstrap';

let component: any;
const fetchCompanies = jest.fn();
const companies: Company[] = [];

describe('App Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<App />);
	});

	describe('Component', () => {
		it('should be defined', () => {
			expect(component).toBeDefined();
		});

		it('should contain the BrowserRouter', () => {
			expect(component.find(BrowserRouter)).toHaveLength(1);
		});

		it('should contain the Container with the CSS class', () => {
			const containerComponent = component.find(Container);
			expect(containerComponent).toHaveLength(1);
			expect(containerComponent.hasClass('main-app-wrapper')).toBeTruthy();
		});
	});
});