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
		fetchDailySeries: (size?: number, finalCallback?: () => void): void => {
			sanityUnsubscribe(streamSubscription);
			streamSubscription = WebSocketProxy.getStreamObservable().subscribe(onStreamArrived);
			WebSocketProxy.requestAllData(size);

			function onStreamArrived(message: any) {
				if (message.finished) {
					sanityUnsubscribe(streamSubscription);
					if (finalCallback) {
						finalCallback();
					}
				}
				dispatch(fetchAllDailySeries(message.dailySerie));
			}
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

function sanityUnsubscribe(streamSubscription: Subscription | undefined) {
	if (streamSubscription) {
		streamSubscription.unsubscribe();
	}
}
