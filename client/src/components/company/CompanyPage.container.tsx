import { connect } from 'react-redux';
import IStoreState from './../../models/IStoreState';
import CompanyPage from './CompanyPage.component';
import Company from 'models/Company';
import { fetchCompaniesThunk } from './../../actions/companies.action';
import { selectCompany, fetchCompanyThunk } from './../../actions/company.action';
import { Observable, Observer } from 'rxjs';

const mapStateToProps = (state: IStoreState, ownProps: any) => {
	return {
		company: state.selectedCompany
	};
};

const mapDispatchToProps: any = (dispatch: any, ownProps: any) => ({
	fetchCompany: (): Observable<boolean> => {
		return dispatch(fetchCompanyThunk(ownProps.companySymbol));
	}
});

const CompanyPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(CompanyPage);

export default CompanyPageContainer;
