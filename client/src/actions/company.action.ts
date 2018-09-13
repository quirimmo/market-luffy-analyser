import Company from './../models/Company';

export const SELECT_COMPANY: string = 'SELECT_COMPANY';

export const selectCompany = (company: Company | null) => ({ type: SELECT_COMPANY, company });
