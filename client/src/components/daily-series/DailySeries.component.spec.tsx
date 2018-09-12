import * as React from 'react';
import { shallow } from 'enzyme';
import DailySeries from './DailySeries.component';
import DailySerie from './../../models/DailySerie';
import DailySerieCard from '../daily-serie/DailySerieCard.component';

let component: any;
const dailySerie1 = new DailySerie('SYMBOL1', 1, [2, 3], 4);
const dailySerie2 = new DailySerie('SYMBOL2', 5, [6, 7], 8);
const dailySeries = [dailySerie1, dailySerie2];

describe('DailySeries Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<DailySeries dailySeries={dailySeries} />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	describe('render', () => {
		it('should define a DailySerieCard component for each dailySerie', () => {
			expect(component.find(DailySerieCard)).toHaveLength(2);
			expect(component.find(DailySerieCard).at(0).props().dailySerie).toEqual(dailySerie1);
			expect(component.find(DailySerieCard).at(1).props().dailySerie).toEqual(dailySerie2);
		});
	});
});
