import { connect } from 'react-redux';
import App from './../presentationals/App.component';
import { Dispatch } from 'redux';
import { fetchCompaniesAsync } from './../../actions/companies.action';
import IStoreState from './../../models/IStoreState';

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

const AppPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default AppPage;
