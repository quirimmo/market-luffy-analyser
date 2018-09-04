import { FETCH_ALL_DAILY_SERIES } from './../actions/daily-series.action';

const dailySeries = (state: any[] = [], action: any): any[] => {
	switch (action.type) {
		case FETCH_ALL_DAILY_SERIES:
			return [...state, ...action.dailySeries];
		default:
			return state;
	}
};

export default dailySeries;
