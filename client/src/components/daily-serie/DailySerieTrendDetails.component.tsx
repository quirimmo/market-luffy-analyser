import * as React from 'react';
import DailySerie from 'models/DailySerie';
import DailySerieTrendDetailsRow from './DailySerieTrendDetailsRow.component';

interface IDailySerieTrendDetails {
	dailySerie: DailySerie;
}

class DailySerieTrendDetails extends React.Component<IDailySerieTrendDetails, any> {
	constructor(props: IDailySerieTrendDetails) {
		super(props);
	}

	public render() {
		return (
			<React.Fragment>
				<DailySerieTrendDetailsRow label="Weekly Trend:" value={this.props.dailySerie.calculateTrend(7)} />
				<DailySerieTrendDetailsRow label="Monthly Trend:" value={this.props.dailySerie.calculateTrend(30)} />
				<DailySerieTrendDetailsRow label="Quarter Trend:" value={this.props.dailySerie.calculateTrend(90)} />
				<DailySerieTrendDetailsRow label="Semester Trend:" value={this.props.dailySerie.calculateTrend(180)} />
				<DailySerieTrendDetailsRow label="Yearly Trend:" value={this.props.dailySerie.calculateTrend(365)} />
			</React.Fragment>
		);
	}
}

export default DailySerieTrendDetails;
