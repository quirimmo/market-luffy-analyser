import Company from './../models/Company';
import { FETCH_COMPANIES_FULFILLED, TOGGLE_COMPANY_VISIBILITY } from './../actions/companies.action';

const companies = (state: Company[] = [], action: any): Company[] => {
	switch (action.type) {
		case FETCH_COMPANIES_FULFILLED:
			return [...action.companies];
		case TOGGLE_COMPANY_VISIBILITY:
			return state.map(toggleCompanyVisibility);
		default:
			return state;
	}

	function toggleCompanyVisibility(company: Company) {
		company.isVisible =
			(company.name.toUpperCase().includes(action.companyName) || company.symbol.toUpperCase().includes(action.companyName)) &&
			action.companySectors.indexOf(company.sector.toUpperCase()) > -1;
		return company;
	}
};

export default companies;
