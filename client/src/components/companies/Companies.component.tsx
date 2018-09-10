import * as React from 'react';
import Company from 'models/Company';
import CompanyCard from '../company/CompanyCard.component';
import { Observable } from 'rxjs';
import FilterCompaniesPage from './FilterCompanies.container';

import './style.scss';
import { JsxElement } from 'typescript';

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
		this.onFilterCompany = this.onFilterCompany.bind(this);
		this.onMapCompany = this.onMapCompany.bind(this);
	}

	public render() {
		return (
			<div>
				<FilterCompaniesPage sectors={this.state.sectors} />
				<hr />
				<div className="row text-center">
					{this.props.companies.length ? (
						this.props.companies.filter(this.onFilterCompany).map(this.onMapCompany)
					) : (
						<div className="companies-message row text-center">Loading companies...</div>
					)}
				</div>
			</div>
		);
	}

	public onFilterCompany(company: Company): boolean {
		return company.name.toUpperCase().includes(this.props.companyName) || company.symbol.toUpperCase().includes(this.props.companyName);
	}

	public onMapCompany(company: Company): JSX.Element {
		return (
			<div className="col-lg-3 col-md-4 col-sm-6" key={company.symbol}>
				<CompanyCard company={company} />
			</div>
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
