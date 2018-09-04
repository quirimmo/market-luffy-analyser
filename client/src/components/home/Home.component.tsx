import * as React from 'react';
import WebSocketProxy from './../../services/WebSocketProxy';

class Home extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.getAllData = this.getAllData.bind(this);
	}

	public render() {
		return (
			<div>
				HOME PAGE COMPONENT
				<br />
				<button onClick={this.getAllData}>GET ALL DATA</button>
			</div>
		);
	}

	public getAllData() {
		// data: lastMovement: 0.3289;
		// priceChange: (30)[
		// 	(0.068,
		// 	-0.476)
		// ];
		// symbol: 'ACN';
		// trend: 2.0103;

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
