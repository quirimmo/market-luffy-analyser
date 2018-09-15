import * as React from 'react';

interface INumberFormatterProps {
	value: number;
}

class NumberFormatter extends React.Component<INumberFormatterProps, any> {
	private formattedValue: string;

	constructor(props: INumberFormatterProps) {
		super(props);
		console.log(this.props.value);
		this.formattedValue = this.formatValue();
	}

	public render() {
		return <div>{this.formattedValue}</div>;
	}

	public formatValue(): string {
		let ret: string = '';
		const stringValue: string = this.props.value.toString();
		const decimalValues: string = stringValue.split('.')[1];
		const integerValues: string = stringValue.split('.')[0];
		const formattedIntegers: string[] = [];
		for (let i = integerValues.length - 1, j = 1; i >= 0; i--, j++) {
			formattedIntegers.unshift(integerValues.charAt(i));
			if (j % 3 === 0 && j < integerValues.length - 1) {
				formattedIntegers.unshift(',');
			}
		}
		ret += `${formattedIntegers.join('')}.${decimalValues}`;
		return ret;
	}
}

export default NumberFormatter;
