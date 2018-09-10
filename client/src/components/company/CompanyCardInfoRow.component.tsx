import * as React from 'react';

interface ICompanyCardInfoRowProps {
	label: string;
	value: string;
}

class CompanyCardInfoRow extends React.Component<ICompanyCardInfoRowProps, any> {
	public constructor(props: ICompanyCardInfoRowProps) {
		super(props);
	}

	public render() {
		return (
			<div className="row">
				<div className="col-sm-4 col-6 text-left">{this.props.label}:</div>
				<div className="col-sm-8 col-6 text-right company-card-details-value">{this.props.value}</div>
			</div>
		);
	}
}

export default CompanyCardInfoRow;
