import { FILTER_COMPANY_SECTOR } from './../actions/filter-company-sector.action';

const companySectors = (state: string[] = [], action: any): string[] => {
	switch (action.type) {
		case FILTER_COMPANY_SECTOR:
			return [...action.companySectors];
		default:
			return state;
	}
};

export default companySectors;
