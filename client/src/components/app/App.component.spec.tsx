import * as React from 'react';
import { shallow } from 'enzyme';
import App from './App.component';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
import AppTitle from '../app-title/AppTitle.component';
import AppNavigation from '../app-navigation/AppNavigation.component';
import AppMainContent from '../app-main-content/AppMainContent.component';
import { of } from 'rxjs';

let component: any;
const mockConnectToSocket = jest.fn(() => of(null));
const mockDisconnectFromSocket = jest.fn(() => of(null));
const mockFetchCompanies = jest.fn(() => of(null));

describe('App Presentational Component', () => {
	beforeEach(() => {
		component = shallow(
			<App fetchCompanies={mockFetchCompanies} connectToSocket={mockConnectToSocket} disconnectFromSocket={mockDisconnectFromSocket} />
		);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should define the public methods', () => {
		expect(typeof component.instance().componentDidMount).toEqual('function');
		expect(typeof component.instance().componentWillUnmount).toEqual('function');
	});

	it('should contain the BrowserRouter', () => {
		expect(component.find(BrowserRouter)).toHaveLength(1);
	});

	it('should contain the Container with the CSS class', () => {
		const containerComponent = component.find(Container);
		expect(containerComponent).toHaveLength(1);
		expect(containerComponent.hasClass('main-app-wrapper')).toBeTruthy();
	});

	it('should define the AppTitle component', () => {
		expect(component.find(AppTitle)).toHaveLength(1);
	});

	it('should define the AppNavigation component', () => {
		expect(component.find(AppNavigation)).toHaveLength(1);
	});

	it('should define the AppMainContent component', () => {
		expect(component.find(AppMainContent)).toHaveLength(1);
	});

	describe('componentDidMount', () => {
		it('should call the connectToSocket method', () => {
			component.instance().componentDidMount();
			expect(mockConnectToSocket).toHaveBeenCalled();
		});
	});

	describe('componentWillUnmount', () => {
		it('should call the disconnectFromSocket method', () => {
			component.instance().componentWillUnmount();
			expect(mockDisconnectFromSocket).toHaveBeenCalled();
		});
	});
});
