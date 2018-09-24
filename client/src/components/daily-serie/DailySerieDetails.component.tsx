import * as React from 'react';
import DailySerie from './../../models/DailySerie';
import NumberFormatter from '../shared/NumberFormatter.component';
import PercentageFormatter from '../shared/PercentageFormatter';
import { Moment } from 'moment';
import * as moment from 'moment';
import DailyTime from './../../models/DailyTime';
import DailySerieTrendDetails from './DailySerieTrendDetails.component';
import DailySeriePriceStatisticsDetails from './DailySeriePriceStatisticsDetails.component';
import DailySerieDaysDetails from './DailySerieDaysDetails.component';
import DailySerieYearlyStatistics from './DailySerieYearlyStatistics';

interface IDailySerieDetails {
	dailySerie: DailySerie;
}

class DailySerieDetails extends React.Component<IDailySerieDetails, any> {
	constructor(props: IDailySerieDetails) {
		super(props);
	}

	public render() {
		return (
			<React.Fragment>
				<div className="row container-daily-serie-details">
					<div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-12">
						<DailySerieTrendDetails dailySerie={this.props.dailySerie} />
					</div>
					<div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-12">
						<DailySeriePriceStatisticsDetails dailySerie={this.props.dailySerie} />
					</div>
					<div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-12">
						<DailySerieDaysDetails dailySerie={this.props.dailySerie} />
					</div>
				</div>
				<br />
				<div className="row w-100 small">
					<DailySerieYearlyStatistics dailySerie={this.props.dailySerie} />
				</div>
			</React.Fragment>
		);
	}
}

export default DailySerieDetails;
