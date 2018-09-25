import * as React from 'react';
import PercentageFormatter from '../shared/PercentageFormatter.component';

interface IDailySerieTrendDetailsRow {
	label: string;
	value: number;
}

class DailySerieTrendDetailsRow extends React.Component<IDailySerieTrendDetailsRow, any> {
	constructor(props: IDailySerieTrendDetailsRow) {
		super(props);
	}

	public render() {
		return (
			<div className="row">
				<div className="col-lg-6 col-sm-12 col-12 font-weight-bold">{this.props.label}</div>
				<div className="col-lg-6 col-sm-12 col-12">
					<PercentageFormatter value={this.props.value} />
				</div>
			</div>
		);
	}
}

export default DailySerieTrendDetailsRow;
