import * as React from 'react';
import { shallow } from 'enzyme';
import App from './App.component';
import { BrowserRouter } from 'react-router-dom';
import { Container, Alert } from 'reactstrap';
import AppTitle from '../app-title/AppTitle.component';
import AppNavigation from '../app-navigation/AppNavigation.component';
import AppMainContent from '../app-main-content/AppMainContent.component';
import { of } from 'rxjs';
import LoadingGears from '../shared/LoadingGears.component';

let component: any;
const mockConnectToSocket = jest.fn(() => of(null));
const mockDisconnectFromSocket = jest.fn(() => of(null));
const mockFetchCompanies = jest.fn(() => of(null));
const mockFetchCryptos = jest.fn(() => of(null));


describe('App Presentational Component', () => {
	beforeEach(() => {
		component = shallow(
			<App
				fetchCompanies={mockFetchCompanies}
				connectToSocket={mockConnectToSocket}
				disconnectFromSocket={mockDisconnectFromSocket}
				fetchCryptos={mockFetchCryptos}
			/>
		);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should define the public methods', () => {
		expect(typeof component.instance().getErrorContent).toEqual('function');
		expect(typeof component.instance().getLoadingContent).toEqual('function');
		expect(typeof component.instance().getMainContent).toEqual('function');
		expect(typeof component.instance().componentDidMount).toEqual('function');
		expect(typeof component.instance().componentWillUnmount).toEqual('function');
	});

	it('should init the state', () => {
		expect(component.state().isLoading).toBeFalsy();
		expect(component.state().isError).toBeFalsy();
	});

	describe('render', () => {
		it('should contain the BrowserRouter', () => {
			expect(component.find(BrowserRouter)).toHaveLength(1);
		});

		it('should not display the loading content', () => {
			expect(component.find(LoadingGears)).toHaveLength(0);
		});

		it('should not display the error content', () => {
			expect(component.find(Alert)).toHaveLength(0);
		});

		it('should display the loading content', () => {
			component.setState({ isLoading: true });
			expect(component.find(LoadingGears)).toHaveLength(1);
		});

		it('should display the error content', () => {
			component.setState({ isError: true });
			expect(component.find(Alert)).toHaveLength(1);
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
	});

	describe('getErrorContent', () => {
		it('should return the Alert component', () => {
			const alert: JSX.Element = component.instance().getErrorContent();
			const reactAlertElement: any = alert.type;
			expect(reactAlertElement.name).toEqual('Alert');
		});

		it('should be a danger alert', () => {
			const alert: JSX.Element = component.instance().getErrorContent();
			expect(alert.props.color).toEqual('danger');
		});

		it('should display the error message', () => {
			const alert: JSX.Element = component.instance().getErrorContent();
			expect(alert.props.children).toEqual('Error bootstrapping the application');
		});
	});

	describe('getLoadingContent', () => {
		it('should return the LoadingGears component', () => {
			const loadingGears: JSX.Element = component.instance().getLoadingContent();
			const reactAlertElement: any = loadingGears.type;
			expect(reactAlertElement.name).toEqual('LoadingGears');
		});
	});

	describe('getMainContent', () => {
		it('should return the div container', () => {
			const mainContent: JSX.Element = component.instance().getMainContent();
			expect(mainContent.type).toEqual('div');
		});
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
