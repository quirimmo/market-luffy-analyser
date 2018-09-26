import * as React from 'react';
import { shallow } from 'enzyme';
import Crypto from './../../models/Crypto';
import CryptoDetails from './CryptoDetails.component';
import DailySerieDetails from '../daily-serie/DailySerieDetails.component';
import DailySerie from './../../models/DailySerie';
import DailySerieCardPriceChange from '../daily-serie/DailySerieCardPriceChange.component';

let component: any;
const crypto: Crypto = new Crypto('Symbol', 'Name');
crypto.dailySerie = new DailySerie('Symbol', 1, [2, 3], 4);

describe('CryptoDetails Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<CryptoDetails crypto={crypto} />);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	describe('render', () => {
		it('should display the DailySerieDetails component', () => {
			const dailySerieDetails = component.find(DailySerieDetails);
			expect(dailySerieDetails).toHaveLength(1);
			expect(dailySerieDetails.props().dailySerie).toEqual(crypto.dailySerie);
		});

		it('should display the DailySerieCardPriceChange component', () => {
			const dailySerieCardPriceChange = component.find(DailySerieCardPriceChange);
			expect(dailySerieCardPriceChange).toHaveLength(1);
			expect(dailySerieCardPriceChange.props().priceChange).toEqual([2, 3]);
		});
	});
});
