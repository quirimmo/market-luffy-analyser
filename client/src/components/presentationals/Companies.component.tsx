import * as React from 'react';
import Company from './../../models/Company';

export interface ICompaniesGroupProps {
	companies: Company[];
	fetchCompanies: () => void;
}

class Companies extends React.Component<ICompaniesGroupProps, any> {
	constructor(props: any) {
		super(props);
	}

	public render() {
		return (
			<div className="container">
				<div className="row text-center">
					{this.props.companies.map((company: Company, index: number) => {
						return (
							<div className="col-md-4" key={index}>
								{company.symbol}
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	public componentDidMount() {
		this.props.fetchCompanies();
	}
}

export default Companies;
