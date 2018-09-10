import DailySerie from './../models/DailySerie';

export const FILTER_COMPANY_NAME: string = 'FILTER_COMPANY_NAME';

export const filterCompanyName = (companyName: string) => {
	return {
		type: FILTER_COMPANY_NAME,
		companyName
	};
};
