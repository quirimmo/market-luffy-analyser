import Company from './../models/Company';
import { SELECT_COMPANY } from './../actions/company.action';

const selectedCompany = (state: Company | null = null, action: any): Company | null => {
	switch (action.type) {
		case SELECT_COMPANY:
			return action.company;
		default:
			return state;
	}
};

export default selectedCompany;
