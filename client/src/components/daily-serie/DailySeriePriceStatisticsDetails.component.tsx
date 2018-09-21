import * as React from 'react';
import DailySerie from './../../models/DailySerie';
import NumberFormatter from '../shared/NumberFormatter.component';

interface IDailySeriePriceStatisticsDetails {
	dailySerie: DailySerie;
}

class DailySeriePriceStatisticsDetails extends React.Component<IDailySeriePriceStatisticsDetails, any> {
	constructor(props: IDailySeriePriceStatisticsDetails) {
		super(props);
	}

	public render() {
		return (
			<React.Fragment>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Starting Price: </div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">
						<NumberFormatter value={this.props.dailySerie.getStartingDailyTime().open} suffix="$" />(
						{this.props.dailySerie.getStartingDailyTime().time.format('YYYY-MM-DD')})
					</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Last Close Price: </div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">
						<NumberFormatter value={this.props.dailySerie.getLastDailyTime().close} suffix="$" />(
						{this.props.dailySerie.getLastDailyTime().time.format('YYYY-MM-DD')})
					</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Previous higher close price:</div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">
						<NumberFormatter value={this.props.dailySerie.getLastHigherCloseDailyTime().close} suffix="$" />(
						{this.props.dailySerie.getLastHigherCloseDailyTime().time.format('YYYY-MM-DD')})
					</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Previous lower/same close price:</div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">
						<NumberFormatter value={this.props.dailySerie.getLastLowerCloseDailyTime().close} suffix="$" />(
						{this.props.dailySerie.getLastLowerCloseDailyTime().time.format('YYYY-MM-DD')})
					</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Highest close price:</div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">
						<NumberFormatter value={this.props.dailySerie.getHighestCloseDailyTime().close} suffix="$" />(
						{this.props.dailySerie.getHighestCloseDailyTime().time.format('YYYY-MM-DD')})
					</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Lowest close price:</div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">
						<NumberFormatter value={this.props.dailySerie.getLowestCloseDailyTime().close} suffix="$" />(
						{this.props.dailySerie.getLowestCloseDailyTime().time.format('YYYY-MM-DD')})
					</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Max Num of Consecutive Positive Days:</div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">{this.props.dailySerie.getMaxNumberOfPositiveDailyTimes()}</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Max Num of Consecutive Negative Days:</div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">{this.props.dailySerie.getMaxNumberOfNegativeDailyTimes()}</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Min Num of Consecutive Positive Days:</div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">{this.props.dailySerie.getMinNumberOfPositiveDailyTimes()}</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Min Num of Consecutive Negative Days:</div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">{this.props.dailySerie.getMinNumberOfNegativeDailyTimes()}</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Total Num of Negative Days:</div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">{this.props.dailySerie.getNumberOfNegativeDailyTimes()}</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Total Num of Positive Days:</div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">{this.props.dailySerie.getNumberOfPositiveDailyTimes()}</div>
				</div>
			</React.Fragment>
		);
	}
}

export default DailySeriePriceStatisticsDetails;
