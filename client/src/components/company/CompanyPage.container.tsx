import { connect } from 'react-redux';
import IStoreState from './../../models/IStoreState';
import CompanyPage from './CompanyPage.component';
import { fetchCompanyThunk } from './../../actions/company.action';
import { Observable } from 'rxjs';

const mapStateToProps = (state: IStoreState, ownProps: any) => {
	return {
		company: state.selectedCompany,
		companies: state.companies
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
