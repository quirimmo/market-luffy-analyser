export const FETCH_ALL_DAILY_SERIES: string = 'FETCH_ALL_DAILY_SERIES';

export const fetchAllDailySeries = (response: any) => {
	console.log('fetching all daily series', response);
	return {
		type: FETCH_ALL_DAILY_SERIES,
		response
	};
};
