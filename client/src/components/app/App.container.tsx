import { connect } from 'react-redux';
import App from './App.component';
import { Dispatch } from 'redux';
import { fetchCompaniesAsync } from 'actions/companies.action';
import IStoreState from 'models/IStoreState';

const mapStateToProps = (state: IStoreState, ownProps: any) => ({});

const mapDispatchToProps: any = (dispatch: Dispatch<any>) => ({});

const AppPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default AppPage;
