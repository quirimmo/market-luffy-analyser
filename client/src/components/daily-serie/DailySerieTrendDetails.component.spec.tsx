import * as React from 'react';
import { shallow } from 'enzyme';
import DailySerieTrendDetails from './DailySerieTrendDetails.component';
import DailySerie from './../../models/DailySerie';
import DailySerieTrendDetailsRow from './DailySerieTrendDetailsRow.component';

const dailySerie: DailySerie = new DailySerie('Symbol', 0, [1, 2], 3);
let component: any;

describe('DailySerieTrendDetails Presentational Component', () => {
	beforeEach(() => {
		spyOn(dailySerie, 'calculateTrend').and.returnValue(3);
		component = shallow(<DailySerieTrendDetails dailySerie={dailySerie} />);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	describe('render', () => {
		let dailySerieDetailsRows: any;
		beforeEach(() => {
			dailySerieDetailsRows = component.find(DailySerieTrendDetailsRow);
		});

		it('should display the DailySerieTrendDetailsRow components', () => {
			expect(dailySerieDetailsRows).toHaveLength(5);
		});

		it('should display the Weekly Trend element', () => {
			expect(dailySerieDetailsRows.at(0).props().label).toEqual('Weekly Trend:');
			expect(dailySerieDetailsRows.at(0).props().value).toEqual(3);
			expect(dailySerie.calculateTrend).toHaveBeenCalledWith(7);
		});

		it('should display the Monthly Trend element', () => {
			expect(dailySerieDetailsRows.at(1).props().label).toEqual('Monthly Trend:');
			expect(dailySerieDetailsRows.at(1).props().value).toEqual(3);
			expect(dailySerie.calculateTrend).toHaveBeenCalledWith(30);
		});

		it('should display the Quarter Trend element', () => {
			expect(dailySerieDetailsRows.at(2).props().label).toEqual('Quarter Trend:');
			expect(dailySerieDetailsRows.at(2).props().value).toEqual(3);
			expect(dailySerie.calculateTrend).toHaveBeenCalledWith(90);
		});

		it('should display the Semester Trend element', () => {
			expect(dailySerieDetailsRows.at(3).props().label).toEqual('Semester Trend:');
			expect(dailySerieDetailsRows.at(3).props().value).toEqual(3);
			expect(dailySerie.calculateTrend).toHaveBeenCalledWith(180);
		});

		it('should display the Yearly Trend element', () => {
			expect(dailySerieDetailsRows.at(4).props().label).toEqual('Yearly Trend:');
			expect(dailySerieDetailsRows.at(4).props().value).toEqual(3);
			expect(dailySerie.calculateTrend).toHaveBeenCalledWith(365);
		});
	});
});
