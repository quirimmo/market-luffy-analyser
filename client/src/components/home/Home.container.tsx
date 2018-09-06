import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import IStoreState from 'models/IStoreState';
import { fetchAllDailySeries } from './../../actions/daily-series.action';
import Home from './Home.component';
import DailySerie from './../../models/DailySerie';

const mapStateToProps = (state: IStoreState, ownProps: any) => {
	return {
		dailySeries: state.dailySeries
	};
};

const mapDispatchToProps: any = (dispatch: Dispatch<Action>) => ({
	fetchDailySeries: (dailySeries: DailySerie): void => {
		dispatch(fetchAllDailySeries(dailySeries));
	}
});

const HomePage = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

export default HomePage;
