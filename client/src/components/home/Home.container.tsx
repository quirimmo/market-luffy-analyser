import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import IStoreState from 'models/IStoreState';
import Home from './Home.component';
import WebSocketProxy from './../../services/WebSocketProxy';
import { fetchAllDailySeries } from './../../actions/daily-series.action';

const mapStateToProps = (state: IStoreState, ownProps: any) => {
	return {
		dailySeries: state.dailySeries
	};
};

const mapDispatchToProps: any = (dispatch: Dispatch<Action>) => ({
	fetchDailySeries: (): void => {
		WebSocketProxy.streamObservable.subscribe((data: any) => {
			dispatch(fetchAllDailySeries(data));
		});
		WebSocketProxy.requestAllData();
	}
});

const HomePage = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

export default HomePage;
