import * as React from 'react';
import Company from 'models/Company';
import CompanyCard from '../company/CompanyCard.component';
import { Observable } from 'rxjs';

export interface ICompaniesProps {
	companies: Company[];
	fetchCompanies: () => Observable<any>;
}

class Companies extends React.Component<ICompaniesProps, any> {
	constructor(props: any) {
		super(props);
	}

	public render() {
		return (
			<div className="row text-center">
				{this.props.companies.length ? (
					this.props.companies.map((company: Company, index: number) => {
						return (
							<div className="col-md-2" key={index}>
								<CompanyCard company={company} />
							</div>
						);
					})
				) : (
					<p>Loading companies...</p>
				)}
			</div>
		);
	}

	public componentDidMount() {
		this.props.fetchCompanies();
	}
}

export default Companies;
