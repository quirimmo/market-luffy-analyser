import { FILTER_COMPANY_NAME } from './../actions/filter-company-name.action';

const companyName = (state: string = '', action: any): string => {
	switch (action.type) {
		case FILTER_COMPANY_NAME:
			return action.companyName;
		default:
			return state;
	}
};

export default companyName;
