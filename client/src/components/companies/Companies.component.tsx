import * as React from 'react';
import Company from 'models/Company';
import CompanyCard from '../company/CompanyCard.component';
import { Observable } from 'rxjs';
import FilterCompaniesPage from './FilterCompanies.container';

import './style.scss';

interface ICompaniesProps {
	companies: Company[];
	fetchCompanies: () => Observable<Company[]>;
	companyName: string;
}

interface ICompaniesState {
	sectors: string[];
}

class Companies extends React.Component<ICompaniesProps, ICompaniesState> {
	constructor(props: any) {
		super(props);
		this.state = {
			sectors: []
		};
	}

	public render() {
		return (
			<div>
				<FilterCompaniesPage sectors={this.state.sectors} />
				<hr />
				<div className="row text-center">
					{this.props.companies.length ? (
						this.props.companies
							.filter((company: Company) => company.name.toUpperCase().includes(this.props.companyName))
							.map((company: Company, index: number) => {
								return (
									<div className="col-lg-3 col-md-4 col-sm-6" key={index}>
										<CompanyCard company={company} />
									</div>
								);
							})
					) : (
						<div className="companies-message row text-center">Loading companies...</div>
					)}
				</div>
			</div>
		);
	}

	public componentDidMount() {
		const onSubscribe = (companies: Company[]) => {
			const sectors = new Set(this.props.companies.map((company: Company) => company.sector));
			this.setState({ sectors: Array.from(sectors) });
		};

		this.props.fetchCompanies().subscribe(onSubscribe);
		setInterval(() => {
			console.log('TYPED COMPANY NAME:', this.props.companyName);
		}, 5000);
	}
}

export default Companies;
