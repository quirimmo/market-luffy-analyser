import * as React from 'react';
import { shallow } from 'enzyme';
import DailySerieCard from './DailySerieCard.component';
import DailySerie from './../../models/DailySerie';
import DailySerieCardInfoRow from './DailySerieCardInfoRow.component';
import DailySerieCardPriceChange from './DailySerieCardPriceChange.component';

let component: any;
const dailySerie = new DailySerie('SYMBOL', 1, [2, 3], 4);

describe('DailySerieCard Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<DailySerieCard dailySerie={dailySerie} />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	describe('render', () => {
		it('should display the article of the daily serie card', () => {
			expect(component.find('article.daily-serie-card')).toHaveLength(1);
		});

		it('should display the 3 DailySerieCardInfoRow components', () => {
			expect(component.find(DailySerieCardInfoRow)).toHaveLength(3);
		});

		it('should display the DailySerieCardPriceChange component', () => {
			const dailySerieCardPriceChange = component.find(DailySerieCardPriceChange);
			expect(dailySerieCardPriceChange).toHaveLength(1);
		});
	});
});
