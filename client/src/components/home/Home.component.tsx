import * as React from 'react';
import DailySerie from 'models/DailySerie';

export interface IHomeProps {
	dailySeries: DailySerie[];
	fetchDailySeries: (size: number, callback: () => void) => {};
	resetDailySeries: () => {};
}
class Home extends React.Component<IHomeProps, any> {
	constructor(props: any) {
		super(props);
		this.getAllData = this.getAllData.bind(this);
	}

	public render() {
		return (
			<div>
				<button onClick={this.getAllData}>GET ALL DATA</button>
				<br />
				{this.props.dailySeries.length ? (
					this.props.dailySeries.map((dailySerie: any, index: number) => {
						return (
							<div key={dailySerie.symbol}>
								{dailySerie.symbol}
								<br />
								{dailySerie.lastMovement}
								<br />
								{dailySerie.trend}
								<hr />
								<br />
							</div>
						);
					})
				) : (
					<div className="daily-series-message">Loading daily series...</div>
				)}
			</div>
		);
	}

	public getAllData() {
		this.props.resetDailySeries();
		this.props.fetchDailySeries(6, () => {
			console.log('I am a callback from component');
		});
	}
}

export default Home;
