import { connect } from 'react-redux';
import App from './App.component';
import { Dispatch } from 'redux';
import IStoreState from 'models/IStoreState';
import { Observable } from 'rxjs';
import WebSocketProxy from './../../services/WebSocketProxy';

const mapStateToProps = (state: IStoreState, ownProps: any) => ({});

const mapDispatchToProps: any = (dispatch: Dispatch<any>) => ({
	connectToSocket: (): Observable<any> => WebSocketProxy.connect(),
	disconnectFromSocket: (): Observable<any> => WebSocketProxy.disconnect()
});

const AppPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default AppPage;
