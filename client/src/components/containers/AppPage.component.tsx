import { connect } from 'react-redux';
import App from './../presentationals/App.component';
import { Dispatch } from 'redux';
import { fetchCompanies } from './../../actions/companies.action';

const mapStateToProps = (state: any, ownProps: any) => {
	// const performancesResultsReader = new PerformancesResultsReader();
	// performancesResultsReader.read();
	// const statisticsResultsReader = new StatisticsResultsReader();
	// statisticsResultsReader.read();

	// state.scenarios = performancesResultsReader.getScenarios();
	// state.steps = statisticsResultsReader.getSteps();
	// state.totalDuration = performancesResultsReader.getTotalDuration();
	return {};
};

const mapDispatchToProps: any = (dispatch: Dispatch<any>) => ({
	fetchCompanies: () => {
		dispatch(fetchCompanies());
	}
});

const AppPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default AppPage;
