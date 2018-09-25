import * as React from 'react';
import PercentageFormatter from '../shared/PercentageFormatter.component';
import NumberFormatter from '../shared/NumberFormatter.component';

interface IDailySeriePriceStatisticsDetailsRow {
	label: string;
	value: number;
	time: string;
	className?: string;
}

class DailySeriePriceStatisticsDetailsRow extends React.Component<IDailySeriePriceStatisticsDetailsRow, any> {
	constructor(props: IDailySeriePriceStatisticsDetailsRow) {
		super(props);

		this.getContent = this.getContent.bind(this);
	}

	public render() {
		return (
			<div className="row">
				<div className="col-lg-6 col-sm-12 col-12 font-weight-bold">{this.props.label}</div>
				<div className="col-lg-6 col-sm-12 col-12">
					{this.getContent()}
				</div>
			</div>
		);
	}

	public getContent() {
		return this.props.time !== 'Invalid date' ? (
			<React.Fragment>
				<NumberFormatter className={this.props.className} value={this.props.value} suffix="$" />{' '}
				<span className="font-italic daily-serie-price-times">({this.props.time})</span>
			</React.Fragment>
		) : (
			<span className="font-italic daily-serie-price-times">Not Available</span>
		);
	}
}

export default DailySeriePriceStatisticsDetailsRow;
