import Company from './../models/Company';
import { FETCH_COMPANIES } from './../actions/companies.action';

const companies = (state: Company[] = [], action: any): Company[] => {
	switch (action.type) {
		case FETCH_COMPANIES:
			return [...state, ...action.companies];
		default:
			return state;
	}
};

export default companies;
