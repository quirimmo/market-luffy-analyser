import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import IStoreState from 'models/IStoreState';
import Companies from './Companies.component';
import { FETCH_COMPANIES } from './../../actions/companies.action';

const mapStateToProps = (state: IStoreState, ownProps: any) => {
	return {
		companies: state.companies
	};
};

const mapDispatchToProps: any = (dispatch: Dispatch<Action>) => ({
	fetchCompanies: (): void => {
		dispatch({ type: FETCH_COMPANIES });
	}
});

const CompaniesPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(Companies);

export default CompaniesPage;
