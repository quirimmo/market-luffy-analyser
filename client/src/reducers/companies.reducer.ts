import Company from './../models/Company';
import { FETCH_COMPANIES_FULFILLED } from './../actions/companies.action';

const companies = (state: Company[] = [], action: any): Company[] => {
	switch (action.type) {
		case FETCH_COMPANIES_FULFILLED:
			return [...action.companies];
		default:
			return state;
	}
};

export default companies;
