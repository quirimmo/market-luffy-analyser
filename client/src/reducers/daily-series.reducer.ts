import { FETCH_ALL_DAILY_SERIES } from './../actions/daily-series.action';
import DailySerie from './../models/DailySerie';

const dailySeries = (state: DailySerie[] = [], action: any): any[] => {
	switch (action.type) {
		case FETCH_ALL_DAILY_SERIES:
			return state.concat(action.dailySerie);
		default:
			return state;
	}
};

export default dailySeries;
