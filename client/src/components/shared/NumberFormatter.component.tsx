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
		this.decimalsPrecision = this.props.decimalsPrecision || this.getDecimalPrecisionToUse();
		this.suffix = this.props.suffix || '';
		this.formattedValue = this.formatValue();
	}

	public render() {
		return (
			<span className={this.props.className}>
				{this.formattedValue}
				{this.suffix}
			</span>
		);
	}

	public formatValue(): string {
		const stringValue: string = this.props.value.toFixed(this.decimalsPrecision);
		const integerValues: string = stringValue.split('.')[0];
		const decimalValues: string = stringValue.split('.')[1] || '';
		const formattedIntegers: string[] = [];
		for (let i = integerValues.length - 1, j = 1; i >= 0; i--, j++) {
			formattedIntegers.unshift(integerValues.charAt(i));
			if (j % 3 === 0 && j < integerValues.length) {
				formattedIntegers.unshift(',');
			}
		}
		let ret = formattedIntegers.join('');
		if (decimalValues.length) {
			ret += `.${decimalValues}`;
		}
	// };.${decimalValues}`;
		return ret;
	}

	public getDecimalPrecisionToUse(): number {
		const stringNumber = this.props.value.toString().replace('-', '');
		const integerDigits = stringNumber.split('.')[0].length;
		if (integerDigits < 2) {
			return 4;
		}
		if (integerDigits > 6) {
			return 0;
		}
		return 2;
	}
}

export default NumberFormatter;
