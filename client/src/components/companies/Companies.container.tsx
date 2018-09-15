import { connect } from 'react-redux';
import IStoreState from 'models/IStoreState';
import Companies from './Companies.component';
import { fetchCompaniesThunk } from './../../actions/companies.action';
import Company from './../../models/Company';
import { Observable } from 'rxjs';
import { selectCompany } from './../../actions/company.action';

const mapStateToProps = (state: IStoreState, ownProps: any) => {
	return {
		companies: state.companies
	};
};

const mapDispatchToProps: any = (dispatch: (fn: any) => any, ownProps: any) => ({
	fetchCompanies: (): Observable<Company[]> => {
		return dispatch(fetchCompaniesThunk());
	},
	selectCompany: (company: Company | null): void => {
		dispatch(selectCompany(company));
	}
});

const CompaniesPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(Companies);

export default CompaniesPage;
