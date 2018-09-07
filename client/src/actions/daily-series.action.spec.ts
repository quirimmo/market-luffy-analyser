import { FETCH_ALL_DAILY_SERIES, RESET_DAILY_SERIES, fetchAllDailySeries, resetDailySeries } from './daily-series.action';
import DailySerie from './../models/DailySerie';

describe('daily-series.action', () => {
	it('should define the FETCH_ALL_DAILY_SERIES action type', () => {
		expect(FETCH_ALL_DAILY_SERIES).toEqual('FETCH_ALL_DAILY_SERIES');
	});

	it('should define the RESET_DAILY_SERIES action type', () => {
		expect(RESET_DAILY_SERIES).toEqual('RESET_DAILY_SERIES');
	});

	it('should define the actions', () => {
		expect(typeof fetchAllDailySeries).toEqual('function');
		expect(typeof resetDailySeries).toEqual('function');
	});

	describe('resetDailySeries', () => {
		it('should return the action', () => {
			expect(resetDailySeries()).toEqual({ type: RESET_DAILY_SERIES });
		});
	});

	describe('fetchAllDailySeries', () => {
		it('should return the action', () => {
			const dailySerie: DailySerie = new DailySerie('SYM1', 0, [1, 2], 3);
			expect(fetchAllDailySeries(dailySerie)).toEqual({ type: FETCH_ALL_DAILY_SERIES, dailySerie });
		});
	});
});
