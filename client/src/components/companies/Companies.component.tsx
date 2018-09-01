import * as React from 'react';
import Company from 'models/Company';
import CompanyCard from '../company/CompanyCard.component';

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
			<div className="row text-center">
				{this.props.companies.map((company: Company, index: number) => {
					return (
						<div className="col-md-2" key={index}>
							<CompanyCard company={company} />
						</div>
					);
				})}
			</div>
		);
	}

	public componentDidMount() {
		this.props.fetchCompanies();
	}
}

export default Companies;
