import * as React from 'react';
import DailySerie from './../../models/DailySerie';
import NumberFormatter from '../shared/NumberFormatter.component';
import PercentageFormatter from '../shared/PercentageFormatter';
import { Moment } from 'moment';
import * as moment from 'moment';
import DailyTime from './../../models/DailyTime';
import DailySerieTrendDetails from './DailySerieTrendDetails.component';
import DailySeriePriceStatisticsDetails from './DailySeriePriceStatisticsDetails.component';

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
				<DailySerieTrendDetails dailySerie={this.props.dailySerie} />
				<br />
				<DailySeriePriceStatisticsDetails dailySerie={this.props.dailySerie} />
			</div>
		);
	}
}

export default DailySerieDetails;
