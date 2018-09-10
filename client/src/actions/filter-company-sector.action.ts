export const FILTER_COMPANY_SECTOR: string = 'FILTER_COMPANY_SECTOR';

export const filterCompanySectors = (companySectors: string[]) => {
	return {
		type: FILTER_COMPANY_SECTOR,
		companySectors
	};
};
