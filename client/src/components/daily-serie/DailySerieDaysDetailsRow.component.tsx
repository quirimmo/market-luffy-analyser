import * as React from 'react';
import PercentageFormatter from '../shared/PercentageFormatter';
import NumberFormatter from '../shared/NumberFormatter.component';

interface IDailySerieDaysDetailsRow {
	label: string;
	value: number;
}

class DailySerieDaysDetailsRow extends React.Component<IDailySerieDaysDetailsRow, any> {
	constructor(props: IDailySerieDaysDetailsRow) {
		super(props);
	}

	public render() {
		return (
			<div className="row">
				<div className="col-lg-8 col-sm-12 col-12">{this.props.label}</div>
				<div className="col-lg-4 col-sm-12 col-12">{this.props.value}</div>
			</div>
		);
	}
}

export default DailySerieDaysDetailsRow;
