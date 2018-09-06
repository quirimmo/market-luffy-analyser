import DailySerie from './../models/DailySerie';

export const FETCH_ALL_DAILY_SERIES: string = 'FETCH_ALL_DAILY_SERIES';

export const fetchAllDailySeries = (dailySerie: DailySerie) => {
	return {
		type: FETCH_ALL_DAILY_SERIES,
		dailySerie
	};
};
