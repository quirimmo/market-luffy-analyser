import * as React from 'react';
import { shallow } from 'enzyme';
import PercentageFormatter from '../shared/PercentageFormatter';
import DailySerieYearlyStatistics from './DailySerieYearlyStatistics';
import DailySerie from './../../models/DailySerie';
import YearsDropdownSelector from '../shared/YearsDropdownSelector.component';
import MonthlyTrendByYear from '../shared/MonthlyTrendByYear.component';

const dailySerie: DailySerie = new DailySerie('Symbol', 0, [1, 2], 3);
let component: any;

describe('DailySerieYearlyStatistics Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<DailySerieYearlyStatistics dailySerie={dailySerie} />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should init the props', () => {
		expect(component.instance().props.dailySerie).toEqual(dailySerie);
	});

	it('should init the state', () => {
		expect(component.instance().state.years).toEqual(new Set());
	});

	it('should expose the public methods', () => {
		expect(typeof component.instance().onSelectFirstYear).toEqual('function');
		expect(typeof component.instance().onSelectSecondYear).toEqual('function');
	});

	describe('render', () => {
		it('should display the YearsDropdownSelector components', () => {
			expect(component.find(YearsDropdownSelector)).toHaveLength(2);
			expect(
				component
					.find(YearsDropdownSelector)
					.at(0)
					.props().onSelectYear
			).toEqual(component.instance().onSelectFirstYear);
			expect(
				component
					.find(YearsDropdownSelector)
					.at(1)
					.props().onSelectYear
			).toEqual(component.instance().onSelectSecondYear);
		});

		it('should display the MonthlyTrendByYear components', () => {
			component.setState({ firstYear: 1, secondYear: 2 });
			expect(component.find(MonthlyTrendByYear)).toHaveLength(2);
			const firstMonthlyYear: any = component.find(MonthlyTrendByYear).at(0);
			const secondtMonthlyYear: any = component.find(MonthlyTrendByYear).at(1);
			expect(firstMonthlyYear.props().dailySerie).toEqual(dailySerie);
			expect(firstMonthlyYear.props().year).toEqual(1);
			expect(secondtMonthlyYear.props().dailySerie).toEqual(dailySerie);
			expect(secondtMonthlyYear.props().year).toEqual(2);
		});
	});

	describe('onSelectFirstYear', () => {
		it('should set the first year prop in the state', () => {
			component.instance().onSelectFirstYear(10);
			expect(component.state().firstYear).toEqual(10);
		});
	});
	describe('onSelectSecondYear', () => {
		it('should set the second year prop in the state', () => {
			component.instance().onSelectSecondYear(20);
			expect(component.state().secondYear).toEqual(20);
		});
	});
});
