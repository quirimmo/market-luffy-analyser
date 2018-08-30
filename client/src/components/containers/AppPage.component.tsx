import { connect } from 'react-redux';
import App from './../presentationals/App.component';
import { Dispatch } from 'redux';

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

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

const AppPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default AppPage;
