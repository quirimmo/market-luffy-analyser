import WebSocketProxy from './../../services/WebSocketProxy';
import * as React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import AppPage from './App.container';

const mockStore = configureMockStore();
const store = mockStore({});
let component: any;

describe('App Container Component', () => {
	beforeEach(() => {
		component = shallow(<AppPage store={store} />);
	});

	it('should define the component', () => {
		expect(component).toBeDefined();
	});

	it('should define the props', () => {
		expect(typeof component.props().connectToSocket).toEqual('function');
		expect(typeof component.props().disconnectFromSocket).toEqual('function');
	});

	describe('connectToSocket', () => {
		it('should call the WebSocketProxy.connect method', () => {
			spyOn(WebSocketProxy, 'connect');
			component.props().connectToSocket();
			expect(WebSocketProxy.connect).toHaveBeenCalled();
		});
	});

	describe('disconnectFromSocket', () => {
		it('should call the WebSocketProxy.disconnect method', () => {
			spyOn(WebSocketProxy, 'disconnect');
			component.props().disconnectFromSocket();
			expect(WebSocketProxy.disconnect).toHaveBeenCalled();
		});
	});
});
