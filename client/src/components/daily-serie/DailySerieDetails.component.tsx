import * as React from 'react';
import DailySerie from './../../models/DailySerie';
import NumberFormatter from '../shared/NumberFormatter.component';
import PercentageFormatter from '../shared/PercentageFormatter';
import { Moment } from 'moment';
import * as moment from 'moment';
import DailyTime from './../../models/DailyTime';

interface IDailySerieDetails {
	dailySerie: DailySerie;
}

class DailySerieDetails extends React.Component<IDailySerieDetails, any> {
	private lastClosePrice: number;
	private lastTimeHigherClosePrice: Moment;
	private highestClosePrice: number;
	private highestClosePriceDate: Moment;

	constructor(props: IDailySerieDetails) {
		super(props);
		this.lastClosePrice = this.props.dailySerie.dailyTimes[0].close || 0;
		const lastHigherDailyTime = this.props.dailySerie.dailyTimes.find((dailyTime: DailyTime) => this.lastClosePrice < dailyTime.close);
		this.lastTimeHigherClosePrice = lastHigherDailyTime ? lastHigherDailyTime.time : this.props.dailySerie.dailyTimes[0].time || moment();
		const closePrices = this.props.dailySerie.dailyTimes.map((dailyTime: DailyTime) => dailyTime.close);
		this.highestClosePrice = Math.max(...closePrices);
		const highestClosePriceDailyTime = this.props.dailySerie.dailyTimes.find((dailyTime: DailyTime) => dailyTime.close === this.highestClosePrice);
		this.highestClosePriceDate = highestClosePriceDailyTime ? highestClosePriceDailyTime.time : moment();
	}

	public render() {
		return (
			<div>
				{/* Block of trends info */}
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Weekly Trend: </div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">
						<PercentageFormatter value={this.props.dailySerie.weeklyTrend} />
					</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Monthly Trend: </div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">
						<PercentageFormatter value={this.props.dailySerie.monthlyTrend} />
					</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Quarter Trend: </div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">
						<PercentageFormatter value={this.props.dailySerie.quarterTrend} />
					</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Semester Trend: </div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">
						<PercentageFormatter value={this.props.dailySerie.semesterTrend} />
					</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Yearly Trend: </div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">
						<PercentageFormatter value={this.props.dailySerie.yearlyTrend} />
					</div>
				</div>
				{/* Block of last close price info */}
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Last Close Price: </div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">
						<NumberFormatter value={this.lastClosePrice} />
					</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Previous day with an higher close price:</div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">{this.lastTimeHigherClosePrice.format('YYYY-MM-DD')}</div>
				</div>
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">Highest close price:</div>
					<div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-6">
						{this.highestClosePrice},{this.highestClosePriceDate.format('YYYY-MM-DD')}
					</div>
				</div>
			</div>
		);
	}
}

export default DailySerieDetails;
