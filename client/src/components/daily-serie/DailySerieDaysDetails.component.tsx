import * as React from 'react';
import DailySerie from './../../models/DailySerie';
import DailySerieDaysDetailsRow from './DailySerieDaysDetailsRow.component';

interface IDailySerieDaysDetails {
	dailySerie: DailySerie;
}

class DailySerieDaysDetails extends React.Component<IDailySerieDaysDetails, any> {
	constructor(props: any) {
		super(props);
	}

	public render() {
		return (
			<React.Fragment>
				<DailySerieDaysDetailsRow label="Max Consecutive Positives:" value={this.props.dailySerie.getMaxNumberOfPositiveDailyTimes()} />
				<DailySerieDaysDetailsRow label="Max Consecutive Negatives:" value={this.props.dailySerie.getMaxNumberOfNegativeDailyTimes()} />
				<DailySerieDaysDetailsRow label="Min Consecutive Positives:" value={this.props.dailySerie.getMinNumberOfPositiveDailyTimes()} />
				<DailySerieDaysDetailsRow label="Min Consecutive Negatives:" value={this.props.dailySerie.getMinNumberOfNegativeDailyTimes()} />
				<DailySerieDaysDetailsRow label="Total Negatives:" value={this.props.dailySerie.getNumberOfNegativeDailyTimes()} />
				<DailySerieDaysDetailsRow label="Total Positives:" value={this.props.dailySerie.getNumberOfPositiveDailyTimes()} />
			</React.Fragment>
		);
	}
}

export default DailySerieDaysDetails;
