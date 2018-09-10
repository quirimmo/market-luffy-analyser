import * as React from 'react';

interface IDailySerieCardInfoRowProps {
	label: string;
	value: string;
	classes?: string;
}

class DailySerieCardInfoRow extends React.Component<IDailySerieCardInfoRowProps, any> {
	public constructor(props: IDailySerieCardInfoRowProps) {
		super(props);
	}

	public render() {
		return (
			<div className="row">
				<div className="col-sm-7 col-6">{this.props.label}:</div>
				<div className={`col-sm-5 col-6 daily-serie-card-details-value text-right ${this.props.classes}`}>{this.props.value}</div>
			</div>
		);
	}
}

export default DailySerieCardInfoRow;
