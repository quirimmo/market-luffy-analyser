import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Home from './Home.component';
import DailySerie from './../../models/DailySerie';

let component: any;
const mockFetchDailySeries = jest.fn(() => {});
const mockResetDailySeries = jest.fn(() => {});
const inputDailySeries: DailySerie[] = [];

describe('Home Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<Home dailySeries={inputDailySeries} fetchDailySeries={mockFetchDailySeries} resetDailySeries={mockResetDailySeries} />);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should define the public methods', () => {
		expect(typeof component.instance().getAllData).toEqual('function');
	});

	describe('empty daily series', () => {
		it('should define the loading daily series message', () => {
			const dailySeriesMessage = component.find('.daily-series-message');
			expect(dailySeriesMessage).toHaveLength(1);
			expect(dailySeriesMessage.text()).toEqual('Loading daily series...');
		});
	});

	describe('button getAllData', () => {
		let buttonGetAllData: any;

		beforeEach(() => {
			buttonGetAllData = component.find('button');
		});

		it('should be defined', () => {
			expect(buttonGetAllData).toHaveLength(1);
		});

		it('should have the proper text', () => {
			expect(buttonGetAllData.text()).toEqual('GET ALL DATA');
		});

		it('should call the getAllData method on click', () => {
			const spy = spyOn(Home.prototype, 'getAllData');
			const wrapper = mount(<Home dailySeries={inputDailySeries} fetchDailySeries={mockFetchDailySeries} resetDailySeries={mockResetDailySeries} />);
			expect(spy).not.toHaveBeenCalled();
			wrapper.find('button').simulate('click');
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('getAllData', () => {
		it('should call the resetDailySeries props method', () => {
			component.instance().getAllData();
			expect(mockResetDailySeries).toHaveBeenCalled();
		});

		it('should call the fetchDailySeries props method', () => {
			component.instance().getAllData();
			expect(mockFetchDailySeries).toHaveBeenCalled();
		});
	});
});
