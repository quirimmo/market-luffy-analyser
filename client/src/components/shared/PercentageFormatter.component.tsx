import * as React from 'react';
import NumberFormatter from './NumberFormatter.component';
import Utils from './../../utils/Utils';

interface IPercentageFormatterProps {
	value: number;
}

class PercentageFormatter extends React.Component<IPercentageFormatterProps, any> {
	constructor(props: IPercentageFormatterProps) {
		super(props);
	}

	public render() {
		return <NumberFormatter className={Utils.getBearishBullishClass(this.props.value)} value={this.props.value} suffix="%" />;
	}
}

export default PercentageFormatter;
