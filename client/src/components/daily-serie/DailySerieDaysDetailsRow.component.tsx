import * as React from 'react';
import PercentageFormatter from '../shared/PercentageFormatter.component';
import NumberFormatter from '../shared/NumberFormatter.component';

interface IDailySerieDaysDetailsRow {
	label: string;
	value: number;
	className?: string;
}

class DailySerieDaysDetailsRow extends React.Component<IDailySerieDaysDetailsRow, any> {
	constructor(props: IDailySerieDaysDetailsRow) {
		super(props);
	}

	public render() {
		const cssClasses = this.props.className || '';
		return (
			<div className="row">
				<div className="col-lg-8 col-sm-12 col-12 font-weight-bold">{this.props.label}</div>
				<div className={`col-lg-4 col-sm-12 col-12  ${cssClasses}`}>{this.props.value}</div>
			</div>
		);
	}
}

export default DailySerieDaysDetailsRow;
