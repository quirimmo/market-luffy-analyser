import * as React from 'react';
import DailySerie from './../../models/DailySerie';

interface IDailySerieDetails {
	dailySerie: DailySerie;
}

class DailySerieDetails extends React.Component<IDailySerieDetails, any> {
	constructor(props: IDailySerieDetails) {
		super(props);
	}

	public render() {
		return (
			<div>
				<div className="row">Weekly Trend: {this.props.dailySerie.weeklyTrend}</div>
				<div className="row">Monthly Trend: {this.props.dailySerie.montlyTrend}</div>
				<div className="row">Quarter Trend: {this.props.dailySerie.quarterTrend}</div>
				<div className="row">Semester Trend: {this.props.dailySerie.semesterTrend}</div>
				<div className="row">Yearly Trend: {this.props.dailySerie.yearlyTrend}</div>
			</div>
		);
	}
}

export default DailySerieDetails;
