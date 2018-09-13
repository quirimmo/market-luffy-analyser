import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Home from './Home.component';
import DailySerie from './../../models/DailySerie';
import { Button } from 'reactstrap';
import DailySeries from '../daily-series/DailySeries.component';

let component: any;
const mockFetchDailySeries = jest.fn((num: number, callback: () => {}) => {
	callback();
});
const mockResetDailySeries = jest.fn();
const dailySerie1 = new DailySerie('SYMBOL1', 1, [2, 3], 4);
const dailySerie2 = new DailySerie('SYMBOL2', 5, [6, 7], 8);
const inputDailySeries: DailySerie[] = [dailySerie1, dailySerie2];

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

	it('should init the state', () => {
		expect(component.state()).toEqual({ isLoadingData: false });
	});

	describe('render', () => {
		it('should display the Button component for getting all data', () => {
			const button = component.find(Button);
			expect(button).toHaveLength(1);
			expect(button.props().disabled).toBeFalsy();
			expect(button.props().onClick).toEqual(component.instance().getAllData);
			expect(button.props().children).toEqual('GET ALL DATA');
		});

		it('should display the DailySeries component', () => {
			const dailySeriesComponent = component.find(DailySeries);
			expect(dailySeriesComponent).toHaveLength(1);
			expect(dailySeriesComponent.props().dailySeries).toEqual(inputDailySeries);
		});
	});

	describe('getAllData', () => {
		it('should call the setState twice enablind/disabling the loading', () => {
			const spy = spyOn(component, 'setState');
			component.instance().getAllData();
			expect(spy).toHaveBeenCalledTimes(2);
			expect(spy).toHaveBeenNthCalledWith(1, { isLoadingData: true });
			expect(spy).toHaveBeenNthCalledWith(2, { isLoadingData: false });
		});

		it('should call the resetDailySeries prop method', () => {
			component.instance().getAllData();
			expect(mockResetDailySeries).toHaveBeenCalled();
		});

		it('should call the fetchDailySeries with params', () => {
			component.instance().getAllData();
			expect(mockFetchDailySeries).toHaveBeenCalledWith(6, expect.any(Function));
		});
	});
});
