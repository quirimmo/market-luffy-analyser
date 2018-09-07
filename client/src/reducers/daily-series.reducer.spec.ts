import DailySerie from './../models/DailySerie';
import { FETCH_ALL_DAILY_SERIES, RESET_DAILY_SERIES } from './../actions/daily-series.action';
import dailySeries from './daily-series.reducer';

const NOT_EXISTENT_ACTION = {
	type: 'NOT_EXISTENT',
	companies: ['BLA']
};
const NEW_DAILY_SERIE = new DailySerie('Symbol 1', 1, [2, 3], 4);
const FETCH_ALL_DAILY_SERIES_ACTION = {
	type: FETCH_ALL_DAILY_SERIES,
	dailySerie: NEW_DAILY_SERIE
};
const RESET_DAILY_SERIES_ACTION = {
	type: RESET_DAILY_SERIES
};

describe('dailySeries', () => {
	it('should be defined', () => {
		expect(dailySeries).toBeDefined();
		expect(typeof dailySeries).toEqual('function');
	});

	it('should return the initial state if the action not exist', () => {
		expect(dailySeries([], NOT_EXISTENT_ACTION)).toEqual([]);
	});

	it('should concatenate the dailySeries into the state', () => {
		expect(dailySeries([], FETCH_ALL_DAILY_SERIES_ACTION)).toEqual([NEW_DAILY_SERIE]);
	});

	it('should reset the dailySeries in the state', () => {
		expect(dailySeries([NEW_DAILY_SERIE], RESET_DAILY_SERIES_ACTION)).toEqual([]);
	});
});