import { connect } from 'react-redux';
import IStoreState from './../../models/IStoreState';
import CompanyPage from './CompanyPage.component';
import Company from 'models/Company';
import { fetchCompaniesThunk } from './../../actions/companies.action';
import { selectCompany } from './../../actions/company.action';

const mapStateToProps = (state: IStoreState, ownProps: any) => {
	return {
		company: state.selectedCompany
	};
};

const mapDispatchToProps: any = (dispatch: any, ownProps: any) => ({
	fetchCompany: () => {
		dispatch(fetchCompanyDispatcher(ownProps.companySymbol));
	}
});

const CompanyPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(CompanyPage);

export default CompanyPageContainer;

export function fetchCompanyDispatcher(companySymbol: string) {
	return (dispatch: any, getState: any) => {
		const state = getState();
		const stateCompanies = state.companies;
		if (stateCompanies.length === 0) {
			dispatch(fetchCompaniesThunk()).subscribe((data: any) => {
				selectCurrentCompany(data.companies);
			});
		}
		selectCurrentCompany(stateCompanies);

		function selectCurrentCompany(companies: Company[]) {
			const company = companies.find((el: Company) => el.symbol === companySymbol) || null;
			dispatch(selectCompany(company));
		}
	};
}
