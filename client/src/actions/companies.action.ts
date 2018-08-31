import Company from './../models/Company';
import axios from 'axios';

export const FETCH_COMPANIES = 'FETCH_COMPANIES';
export const fetchCompanies = (companies: Company[]) => ({
	type: FETCH_COMPANIES,
	companies
});
export const fetchCompaniesAsync = () => {
	return (dispatch: any) => {
		axios
			.get('http://localhost:3000/companies/')
			.then((data: any) => {
				return data.data.map((value: any) => new Company(value.symbol));
			})
			.then((companies: Company[]) => {
				dispatch(fetchCompanies(companies));
			});
	};
};
