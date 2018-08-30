import Company from './../models/Company';
import { REQUEST_COMPANIES, RECEIVE_COMPANIES } from './../actions/companies.action';

const companies = (state: Company[] = [], action: any): Company[] => {
	switch (action.type) {
		case REQUEST_COMPANIES:
			return state;
		case RECEIVE_COMPANIES:
			return Object.assign({}, state, {
				items: action.companies
			});
		default:
			return state;
	}
};

export default companies;
