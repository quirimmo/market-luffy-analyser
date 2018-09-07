import DailySerie from './../models/DailySerie';

export const FETCH_ALL_DAILY_SERIES: string = 'FETCH_ALL_DAILY_SERIES';
export const RESET_DAILY_SERIES: string = 'RESET_DAILY_SERIES';

export const fetchAllDailySeries = (dailySerie: DailySerie) => {
	return {
		type: FETCH_ALL_DAILY_SERIES,
		dailySerie
	};
};

export const resetDailySeries = () => {
	return {
		type: RESET_DAILY_SERIES
	};
};
