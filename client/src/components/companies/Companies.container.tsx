import { connect } from 'react-redux';
import IStoreState from 'models/IStoreState';
import Companies from './Companies.component';
import { fetchCompaniesThunk } from './../../actions/companies.action';
import Company from './../../models/Company';
import { Observable } from 'rxjs';

const mapStateToProps = (state: IStoreState, ownProps: any) => {
	return {
		companies: state.companies,
		companyName: state.companyName
	};
};

const mapDispatchToProps: any = (dispatch: (fn: any) => Observable<Company[]>, ownProps: any) => ({
	fetchCompanies: (): Observable<Company[]> => {
		return dispatch(fetchCompaniesThunk());
	}
});

const CompaniesPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(Companies);

export default CompaniesPage;
