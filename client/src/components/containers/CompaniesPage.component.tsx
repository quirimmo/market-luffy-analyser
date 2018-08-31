import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchCompaniesAsync } from './../../actions/companies.action';
import IStoreState from './../../models/IStoreState';
import Companies from '../presentationals/Companies.component';

const mapStateToProps = (state: IStoreState, ownProps: any) => {
	return {
		companies: state.companies
	};
};

const mapDispatchToProps: any = (dispatch: Dispatch<any>) => ({
	fetchCompanies: () => {
		dispatch(fetchCompaniesAsync());
	}
});

const CompaniesPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(Companies);

export default CompaniesPage;
