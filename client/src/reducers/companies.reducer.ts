import Company from './../models/Company';

const companies = (state: Company[] = [], action: any): Company[] => {
	switch (action.type) {
		case 'FETCH_COMPANIES':
			return [...state, ...action.companies];
		default:
			return state;
	}
};

export default companies;
