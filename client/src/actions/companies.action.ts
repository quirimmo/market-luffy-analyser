import axios from 'axios';
import { Dispatch } from 'redux';

export const REQUEST_COMPANIES = 'REQUEST_COMPANIES';
function requestCompanies() {
	return {
		type: 'REQUEST_COMPANIES'
	};
}

export const RECEIVE_COMPANIES = 'RECEIVE_COMPANIES';
function receiveCompanies(companies: any) {
	return {
		type: RECEIVE_COMPANIES,
		companies
	};
}

export function fetchCompanies() {
	return (dispatch: Dispatch<any>) => {
		dispatch(requestCompanies());
		return axios
			.get('http://localhost:3000/companies/')
			.then(response => JSON.parse(response.data), error => console.error('An error occured', error))
			.then(data => dispatch(receiveCompanies(data)));
	};
}
