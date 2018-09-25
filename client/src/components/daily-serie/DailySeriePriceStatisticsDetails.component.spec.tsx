import * as React from 'react';
import { shallow } from 'enzyme';
import DailySerie from './../../models/DailySerie';
import DailySeriePriceStatisticsDetails from './DailySeriePriceStatisticsDetails.component';
import DailySeriePriceStatisticsDetailsRow from './DailySeriePriceStatisticsDetailsRow.component';
import DailyTime from './../../models/DailyTime';

const dailyTime1: DailyTime = new DailyTime('2018-10-28', 0, 1, 2, 3, 4, 5);
const dailyTime2: DailyTime = new DailyTime('2017-10-28', 6, 7, 8, 9, 10, 5);
const dailySerie: DailySerie = new DailySerie('Symbol', 0, [1, 2], 3);
dailySerie.dailyTimes = [dailyTime1, dailyTime2];
let component: any;

describe('DailySeriePriceStatisticsDetails Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<DailySeriePriceStatisticsDetails dailySerie={dailySerie} />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should init the props', () => {
		expect(component.instance().props.dailySerie).toEqual(dailySerie);
	});

	describe('render', () => {
		it('should display the DailySeriePriceStatisticsDetailsRow components', () => {
			expect(component.find(DailySeriePriceStatisticsDetailsRow)).toHaveLength(6);
		});

		it('should display the starting price row', () => {
			const startingPriceRow = component.find(DailySeriePriceStatisticsDetailsRow).at(0);
			expect(startingPriceRow.props().label).toEqual('Starting Price:');
			expect(startingPriceRow.props().time).toEqual('2017-10-28');
			expect(startingPriceRow.props().value).toEqual(6);
		});

		it('should display the last close price row', () => {
			const startingPriceRow = component.find(DailySeriePriceStatisticsDetailsRow).at(1);
			expect(startingPriceRow.props().label).toEqual('Last Close Price:');
			expect(startingPriceRow.props().time).toEqual('2018-10-28');
			expect(startingPriceRow.props().value).toEqual(3);
		});

		it('should display the previous higher close price row', () => {
			const startingPriceRow = component.find(DailySeriePriceStatisticsDetailsRow).at(2);
			expect(startingPriceRow.props().label).toEqual('Previous Higher Close Price:');
			expect(startingPriceRow.props().time).toEqual('2017-10-28');
			expect(startingPriceRow.props().value).toEqual(9);
		});

		it('should display the previous lower close price row', () => {
			const startingPriceRow = component.find(DailySeriePriceStatisticsDetailsRow).at(3);
			expect(startingPriceRow.props().label).toEqual('Previous Lower Close Price:');
			expect(startingPriceRow.props().time).toEqual('Invalid date');
			expect(startingPriceRow.props().value).toEqual(0);
		});

		it('should display the highest close price row', () => {
			const startingPriceRow = component.find(DailySeriePriceStatisticsDetailsRow).at(4);
			expect(startingPriceRow.props().label).toEqual('Highest Close Price:');
			expect(startingPriceRow.props().time).toEqual('2017-10-28');
			expect(startingPriceRow.props().value).toEqual(9);
		});

		it('should display the lowest close price row', () => {
			const startingPriceRow = component.find(DailySeriePriceStatisticsDetailsRow).at(5);
			expect(startingPriceRow.props().label).toEqual('Lowest Close Price:');
			expect(startingPriceRow.props().time).toEqual('2018-10-28');
			expect(startingPriceRow.props().value).toEqual(3);
		});
	});
});
