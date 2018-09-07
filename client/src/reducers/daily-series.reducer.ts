import { FETCH_ALL_DAILY_SERIES, RESET_DAILY_SERIES } from './../actions/daily-series.action';
import DailySerie from './../models/DailySerie';

const dailySeries = (state: DailySerie[] = [], action: any): any[] => {
	switch (action.type) {
		case FETCH_ALL_DAILY_SERIES:
			return state.concat(action.dailySerie);
		case RESET_DAILY_SERIES:
			return [];
		default:
			return state;
	}
};

export default dailySeries;
