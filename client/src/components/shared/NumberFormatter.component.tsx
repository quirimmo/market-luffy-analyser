import * as React from 'react';

interface INumberFormatterProps {
	value: number;
	decimalsPrecision?: number;
	suffix?: string;
	className?: string;
}

class NumberFormatter extends React.Component<INumberFormatterProps, any> {
	private formattedValue: string;
	private decimalsPrecision: number;
	private suffix: string;

	constructor(props: INumberFormatterProps) {
		super(props);
		this.decimalsPrecision = this.props.decimalsPrecision || 4;
		this.suffix = this.props.suffix || '';
		this.formattedValue = this.formatValue();
	}

	public render() {
		return (
			<div className={this.props.className}>
				{this.formattedValue}
				{this.suffix}
			</div>
		);
	}

	public formatValue(): string {
		const stringValue: string = this.props.value.toFixed(this.decimalsPrecision);
		const decimalValues: string = stringValue.split('.')[1];
		const integerValues: string = stringValue.split('.')[0];
		const formattedIntegers: string[] = [];
		for (let i = integerValues.length - 1, j = 1; i >= 0; i--, j++) {
			formattedIntegers.unshift(integerValues.charAt(i));
			if (j % 3 === 0 && j < integerValues.length) {
				formattedIntegers.unshift(',');
			}
		}
		const ret = `${formattedIntegers.join('')}.${decimalValues}`;
		return ret;
	}
}

export default NumberFormatter;
