import * as React from 'react';
import PercentageFormatter from '../shared/PercentageFormatter';
import NumberFormatter from '../shared/NumberFormatter.component';

interface IDailySeriePriceStatisticsDetailsRow {
	label: string;
	value: number;
	time: string;
}

class DailySeriePriceStatisticsDetailsRow extends React.Component<IDailySeriePriceStatisticsDetailsRow, any> {
	constructor(props: IDailySeriePriceStatisticsDetailsRow) {
		super(props);
	}

	public render() {
		return (
			<div className="row">
				<div className="col-lg-6 col-sm-12 col-12 font-weight-bold">{this.props.label}</div>
				<div className="col-lg-6 col-sm-12 col-12">
					<NumberFormatter value={this.props.value} suffix="$" /> <span className="font-italic daily-serie-price-times">({this.props.time})</span>
				</div>
			</div>
		);
	}
}

export default DailySeriePriceStatisticsDetailsRow;
