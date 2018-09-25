import * as React from 'react';
import { shallow } from 'enzyme';
import DailySerieDetails from './DailySerieDetails.component';
import DailySerie from './../../models/DailySerie';
import DailySerieTrendDetails from './DailySerieTrendDetails.component';
import DailySeriePriceStatisticsDetails from './DailySeriePriceStatisticsDetails.component';
import DailySerieDaysDetails from './DailySerieDaysDetails.component';
import DailySerieYearlyStatistics from './DailySerieYearlyStatistics';

const dailySerie: DailySerie = new DailySerie('Symbol', 0, [1, 2], 3);
let component: any;

describe('DailySerieDetails Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<DailySerieDetails dailySerie={dailySerie} />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should init the props', () => {
		expect(component.instance().props.dailySerie).toEqual(dailySerie);
	});

	describe('render', () => {
		it('should display the div container of the daily serie details', () => {
			expect(component.find('.container-daily-serie-details')).toHaveLength(1);
		});

		it('should display the DailySerieTrendDetails component', () => {
			expect(component.find(DailySerieTrendDetails)).toHaveLength(1);
			expect(component.find(DailySerieTrendDetails).props().dailySerie).toEqual(dailySerie);
		});

		it('should display the DailySeriePriceStatisticsDetails component', () => {
			expect(component.find(DailySeriePriceStatisticsDetails)).toHaveLength(1);
			expect(component.find(DailySeriePriceStatisticsDetails).props().dailySerie).toEqual(dailySerie);
		});

		it('should display the DailySerieDaysDetails component', () => {
			expect(component.find(DailySerieDaysDetails)).toHaveLength(1);
			expect(component.find(DailySerieDaysDetails).props().dailySerie).toEqual(dailySerie);
		});

		it('should display the DailySerieYearlyStatistics component', () => {
			expect(component.find(DailySerieYearlyStatistics)).toHaveLength(1);
			expect(component.find(DailySerieYearlyStatistics).props().dailySerie).toEqual(dailySerie);
		});
	});
});
