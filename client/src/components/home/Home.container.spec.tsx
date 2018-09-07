import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import HomePage from './Home.container';
import DailySerie from './../../models/DailySerie';
import { RESET_DAILY_SERIES } from './../../actions/daily-series.action';
import { Subject } from 'rxjs';
import WebSocketProxy from './../../services/WebSocketProxy';

const mockStore = configureMockStore();
const dailySerie: DailySerie = new DailySerie('SYMB1', 0, [1, 2], 3);
const dailySeries: DailySerie[] = [dailySerie];
const store = mockStore({
	dailySeries
});
let component: ShallowWrapper<any, any>;

describe('Home Container Component', () => {
	beforeEach(() => {
		component = shallow(<HomePage store={store} />);
	});

	it('should define the component', () => {
		expect(component).toBeDefined();
	});

	it('should init the dailySeries prop of the store', () => {
		expect(component.props().dailySeries).toEqual(dailySeries);
	});

	it('should define the fetchDailySeries prop', () => {
		expect(typeof component.props().fetchDailySeries).toEqual('function');
	});

	it('should define the resetDailySeries prop', () => {
		expect(typeof component.props().resetDailySeries).toEqual('function');
	});

	describe('fetchDailySeries', () => {
		let mockGetStreamObservable: any;
		let mockSubscribeOnStreamObservable: any;
		const mockSubject = new Subject<any>();

		beforeEach(() => {
			mockGetStreamObservable = spyOn(WebSocketProxy, 'getStreamObservable').and.returnValue(mockSubject);
			mockSubscribeOnStreamObservable = spyOn(WebSocketProxy.getStreamObservable(), 'subscribe');
			spyOn(WebSocketProxy, 'requestAllData').and.returnValue([]);
		});

		it('should call the getStreamObservable of WebSocketProxy', () => {
			component.props().fetchDailySeries();
			expect(mockGetStreamObservable).toHaveBeenCalled();
		});

		it('should subscribe to the stream observable of WebSocketProxy', () => {
			component.props().fetchDailySeries();
			expect(mockSubscribeOnStreamObservable).toHaveBeenCalled();
		});

		it('should call the provided callback', () => {
			const spy = jest.fn();
			component.props().fetchDailySeries(spy);
			mockSubject.next({ finished: true });
			expect(spy).toHaveBeenCalled();
			// const spy = spyOn(WebSocketProxy.getStreamObservable(), 'subscribe');
			// const mockInputFn =
			// component.props().fetchDailySeries();
			// expect(spy).toHaveBeenCalled();
		});
	});

	describe('resetDailySeries', () => {
		it('should dispatch the RESET action', () => {
			const expectedAction = { type: RESET_DAILY_SERIES };
			component.props().resetDailySeries();
			expect(store.getActions()).toContainEqual(expectedAction);
		});
	});
});
