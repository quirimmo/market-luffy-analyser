import * as React from 'react';
import Company from 'models/Company';
import CompanyCard from '../company/CompanyCard.component';
import { Observable } from 'rxjs';
import FilterCompaniesPage from './FilterCompanies.container';

import './style.scss';

interface ICompaniesProps {
	companies: Company[];
	companySectors: string[];
	fetchCompanies: () => Observable<Company[]>;
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
		this.onMapCompany = this.onMapCompany.bind(this);
	}

	public render() {
		return (
			<div>
				<FilterCompaniesPage sectors={this.state.sectors} />
				<hr />
				<div className="row text-center">
					{this.props.companies.length ? (
						this.props.companies.filter((company: Company) => company.isVisible).map(this.onMapCompany)
					) : (
						<div className="companies-message row text-center">Loading companies...</div>
					)}
				</div>
			</div>
		);
	}

	public onMapCompany(company: Company): JSX.Element | undefined {
		return company.isVisible ? (
			<div className="col-lg-3 col-md-4 col-sm-6" key={company.symbol}>
				<CompanyCard company={company} />
			</div>
		) : (
			undefined
		);
	}

	public componentDidMount() {
		const instance: Companies = this;
		this.props.fetchCompanies().subscribe(onSubscribe);

		function onSubscribe(companies: Company[]): void {
			const sectors = new Set(instance.props.companies.map((company: Company) => company.sector));
			instance.setState({ sectors: Array.from(sectors) });
		}
	}
}

export default Companies;
