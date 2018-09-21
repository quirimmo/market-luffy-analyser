import * as React from 'react';
import DailySerie from 'models/DailySerie';
import PercentageFormatter from '../shared/PercentageFormatter';

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
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Weekly Trend: </div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">
						<PercentageFormatter value={this.props.dailySerie.calculateTrend(7)} />
					</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Monthly Trend: </div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">
						<PercentageFormatter value={this.props.dailySerie.calculateTrend(30)} />
					</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Quarter Trend: </div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">
						<PercentageFormatter value={this.props.dailySerie.calculateTrend(90)} />
					</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Semester Trend: </div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">
						<PercentageFormatter value={this.props.dailySerie.calculateTrend(180)} />
					</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Yearly Trend: </div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">
						<PercentageFormatter value={this.props.dailySerie.calculateTrend(365)} />
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default DailySerieTrendDetails;
