import * as React from 'react';
import DailySerie from './../../models/DailySerie';
import NumberFormatter from '../shared/NumberFormatter.component';
import DailySeriePriceStatisticsDetailsRow from './DailySeriePriceStatisticsDetailsRow.component';

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
				<DailySeriePriceStatisticsDetailsRow
					value={this.props.dailySerie.getStartingDailyTime().open}
					label="Starting Price:"
					time={this.props.dailySerie.getStartingDailyTime().time.format('YYYY-MM-DD')}
				/>
				<DailySeriePriceStatisticsDetailsRow
					value={this.props.dailySerie.getLastDailyTime().close}
					label="Last Close Price:"
					time={this.props.dailySerie.getLastDailyTime().time.format('YYYY-MM-DD')}
				/>
				<DailySeriePriceStatisticsDetailsRow
					value={this.props.dailySerie.getLastHigherCloseDailyTime().close}
					label="Previous Higher Close Price:"
					time={this.props.dailySerie.getLastHigherCloseDailyTime().time.format('YYYY-MM-DD')}
					className="green-text"
				/>
				<DailySeriePriceStatisticsDetailsRow
					value={this.props.dailySerie.getLastLowerCloseDailyTime().close}
					label="Previous Lower Close Price:"
					time={this.props.dailySerie.getLastLowerCloseDailyTime().time.format('YYYY-MM-DD')}
					className="red-text"
				/>
				<DailySeriePriceStatisticsDetailsRow
					value={this.props.dailySerie.getHighestCloseDailyTime().close}
					label="Highest Close Price:"
					time={this.props.dailySerie.getHighestCloseDailyTime().time.format('YYYY-MM-DD')}
					className="green-text"
				/>
				<DailySeriePriceStatisticsDetailsRow
					value={this.props.dailySerie.getLowestCloseDailyTime().close}
					label="Lowest Close Price:"
					time={this.props.dailySerie.getLowestCloseDailyTime().time.format('YYYY-MM-DD')}
					className="red-text"
				/>
			</React.Fragment>
		);
	}
}

export default DailySeriePriceStatisticsDetails;
