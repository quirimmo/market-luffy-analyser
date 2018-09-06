import * as React from 'react';
import WebSocketProxy from './../../services/WebSocketProxy';

class Home extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.getAllData = this.getAllData.bind(this);
		this.disconnect = this.disconnect.bind(this);
	}

	public render() {
		return (
			<div>
				HOME PAGE COMPONENT
				<br />
				<button onClick={this.getAllData}>GET ALL DATA</button>
				<br />
				<button onClick={this.disconnect}>DISCONNECT</button>
				<br />
				{this.props.dailySeries.length ? (
					this.props.dailySeries.map((dailySerie: any, index: number) => {
						return (
							<div key={dailySerie.symbol}>
								{dailySerie.symbol}
								<br/>
								{dailySerie.lastMovement}
								<br/>
								{dailySerie.trend}
							<hr/><br/>
							</div>
						);
					})
				) : (
					<div className="daily-series-message">Loading daily series...</div>
				)}
			</div>
		);
	}

	public disconnect() {
		WebSocketProxy.disconnect().subscribe(() => {
			console.log('I am disconnected now!');
		});
	}

	public getAllData() {
		// data: lastMovement: 0.3289;
		// priceChange: (30)[
		// 	(0.068,
		// 	-0.476)
		// ];
		// symbol: 'ACN';
		// trend: 2.0103;
		// symbol: "ACN", lastMovement: 0.1364, priceChange: Array(30), trend: 1.1452000000000002
		console.log('Get All Data');
		WebSocketProxy.connect().subscribe(() => {
			WebSocketProxy.streamObservable.subscribe((data: any) => {
				console.log('WOW I DO RECEIVE REAL TIME DATA', data);
				this.props.fetchDailySeries(data);
			});
			WebSocketProxy.requestAllData();
		});
	}
}

export default Home;
