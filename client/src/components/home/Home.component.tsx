import * as React from 'react';
import DailySerie from 'models/DailySerie';
import DailySeries from '../daily-series/DailySeries.component';
import { Button } from 'reactstrap';

interface IHomeProps {
	dailySeries: DailySerie[];
	fetchDailySeries: (size: number, callback: () => void) => {};
	resetDailySeries: () => {};
}

interface IHomeState {
	isLoadingData: boolean;
}

class Home extends React.Component<IHomeProps, IHomeState> {
	constructor(props: IHomeProps) {
		super(props);
		this.state = { isLoadingData: false };
		this.getAllData = this.getAllData.bind(this);
	}

	public render() {
		return (
			<div>
				<div className="row justify-content-center">
					<Button color="primary" disabled={this.state.isLoadingData} onClick={this.getAllData}>
						GET ALL DATA
					</Button>
				</div>
				<br />
				<DailySeries dailySeries={this.props.dailySeries} />
			</div>
		);
	}

	public getAllData() {
		const component: Home = this;
		this.setState({
			isLoadingData: true
		});
		this.props.resetDailySeries();
		this.props.fetchDailySeries(4, onFetchDailySeriesCompleted);

		function onFetchDailySeriesCompleted() {
			component.setState({
				isLoadingData: false
			});
		}
	}
}

export default Home;
