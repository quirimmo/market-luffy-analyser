import * as React from 'react';
import DailySerie from './../../models/DailySerie';
import DailySerieDaysDetailsRow from './DailySerieDaysDetailsRow.component';

interface IDailySerieDaysDetailsProps {
	dailySerie: DailySerie;
}

class DailySerieDaysDetails extends React.Component<IDailySerieDaysDetailsProps, any> {
	constructor(props: IDailySerieDaysDetailsProps) {
		super(props);
	}

	public render() {
		return (
			<React.Fragment>
				<DailySerieDaysDetailsRow
					className="green-text"
					label="Max Consecutive Positives:"
					value={this.props.dailySerie.getMaxNumberOfPositiveDailyTimes()}
				/>
				<DailySerieDaysDetailsRow
					className="red-text"
					label="Max Consecutive Negatives:"
					value={this.props.dailySerie.getMaxNumberOfNegativeDailyTimes()}
				/>
				<DailySerieDaysDetailsRow
					className="green-text"
					label="Min Consecutive Positives:"
					value={this.props.dailySerie.getMinNumberOfPositiveDailyTimes()}
				/>
				<DailySerieDaysDetailsRow
					className="red-text"
					label="Min Consecutive Negatives:"
					value={this.props.dailySerie.getMinNumberOfNegativeDailyTimes()}
				/>
				<DailySerieDaysDetailsRow className="green-text" label="Total Positives:" value={this.props.dailySerie.getNumberOfPositiveDailyTimes()} />
				<DailySerieDaysDetailsRow className="red-text" label="Total Negatives:" value={this.props.dailySerie.getNumberOfNegativeDailyTimes()} />
			</React.Fragment>
		);
	}
}

export default DailySerieDaysDetails;
