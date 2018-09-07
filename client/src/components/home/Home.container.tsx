import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import IStoreState from 'models/IStoreState';
import Home from './Home.component';
import WebSocketProxy from './../../services/WebSocketProxy';
import { fetchAllDailySeries, resetDailySeries } from './../../actions/daily-series.action';
import { Subscription } from 'rxjs';

const mapStateToProps = (state: IStoreState, ownProps: any) => {
	return {
		dailySeries: state.dailySeries
	};
};

const mapDispatchToProps: any = (dispatch: Dispatch<Action>) => {
	let streamSubscription: Subscription | undefined;
	return {
		fetchDailySeries: (size?: number, callback?: () => void): void => {
			if (streamSubscription) {
				streamSubscription.unsubscribe();
			}
			streamSubscription = WebSocketProxy.streamObservable.subscribe((data: any) => {
				if (data.finished) {
					if (callback) {
						callback();
					}
				} else {
					dispatch(fetchAllDailySeries(data));
				}
			});
			WebSocketProxy.requestAllData(size);
		},
		resetDailySeries: (): void => {
			dispatch(resetDailySeries());
		}
	};
};

const HomePage = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

export default HomePage;
