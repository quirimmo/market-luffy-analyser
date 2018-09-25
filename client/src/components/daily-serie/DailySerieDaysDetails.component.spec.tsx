import * as React from 'react';
import { shallow } from 'enzyme';
import DailySerieDaysDetails from './DailySerieDaysDetails.component';
import DailySerie from './../../models/DailySerie';
import DailySerieDaysDetailsRow from './DailySerieDaysDetailsRow.component';

const dailySerie: DailySerie = new DailySerie('Symbol', 0, [1, 2], 3);
let component: any;

describe('DailySerieDaysDetails Presentational Component', () => {
	beforeEach(() => {
		spyOn(dailySerie, 'getMaxNumberOfPositiveDailyTimes').and.returnValue('max positive');
		spyOn(dailySerie, 'getMaxNumberOfNegativeDailyTimes').and.returnValue('max negative');
		spyOn(dailySerie, 'getMinNumberOfPositiveDailyTimes').and.returnValue('min positive');
		spyOn(dailySerie, 'getMinNumberOfNegativeDailyTimes').and.returnValue('min negative');
		spyOn(dailySerie, 'getNumberOfPositiveDailyTimes').and.returnValue('total positive');
		spyOn(dailySerie, 'getNumberOfNegativeDailyTimes').and.returnValue('total negative');
		component = shallow(<DailySerieDaysDetails dailySerie={dailySerie} />);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	describe('render', () => {
		let rows: any;

		beforeEach(() => {
			rows = component.find(DailySerieDaysDetailsRow);
		});

		it('should display all the DailySerieDaysDetailsRow components', () => {
			expect(rows).toHaveLength(6);
		});

		it('should display the max positive row', () => {
			expect(rows.at(0).props().label).toEqual('Max Consecutive Positives:');
			expect(rows.at(0).props().value).toEqual('max positive');
		});

		it('should display the max negative row', () => {
			expect(rows.at(1).props().label).toEqual('Max Consecutive Negatives:');
			expect(rows.at(1).props().value).toEqual('max negative');
		});

		it('should display the min positive row', () => {
			expect(rows.at(2).props().label).toEqual('Min Consecutive Positives:');
			expect(rows.at(2).props().value).toEqual('min positive');
		});

		it('should display the min negative row', () => {
			expect(rows.at(3).props().label).toEqual('Min Consecutive Negatives:');
			expect(rows.at(3).props().value).toEqual('min negative');
		});

		it('should display the total positive row', () => {
			expect(rows.at(4).props().label).toEqual('Total Positives:');
			expect(rows.at(4).props().value).toEqual('total positive');
		});

		it('should display the total negative row', () => {
			expect(rows.at(5).props().label).toEqual('Total Negatives:');
			expect(rows.at(5).props().value).toEqual('total negative');
		});
	});
});
