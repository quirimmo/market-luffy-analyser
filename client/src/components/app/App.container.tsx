import { connect } from 'react-redux';
import App from './App.component';
import IStoreState from './../../models/IStoreState';
import { Observable } from 'rxjs';
import WebSocketProxy from './../../services/WebSocketProxy';
import Company from './../../models/Company';
import { fetchCompaniesThunk } from './../../actions/companies.action';

const mapStateToProps = (state: IStoreState, ownProps: any) => ({});

const mapDispatchToProps: any = (dispatch: any) => ({
	fetchCompanies: (): Observable<Company[]> => dispatch(fetchCompaniesThunk()),
	connectToSocket: (): Observable<any> => WebSocketProxy.connect(),
	disconnectFromSocket: (): Observable<any> => WebSocketProxy.disconnect()
});

const AppPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default AppPage;
