import * as React from 'react';
import Company from 'models/Company';
import CompanyCard from '../company/CompanyCard.component';
import { Observable } from 'rxjs';
import FilterCompaniesPage from './FilterCompanies.container';

import './style.scss';
import SortCompanies from './SortCompanies.component';

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
		this.sortCompanies = this.sortCompanies.bind(this);
	}

	public render() {
		return (
			<div>
				<FilterCompaniesPage sectors={this.state.sectors} />
				<hr />
				<SortCompanies sortCompanies={this.sortCompanies} />
				<br />
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

	public sortCompanies(activeSort: string): void {
		// let sortField: string = '';
		switch (activeSort) {
			case 'NAME':
				this.props.companies.sort(
					(a: Company, b: Company): number => {
						return a.name.toUpperCase().localeCompare(b.name.toUpperCase());
					}
				);
				break;
			case 'MARKET CAP':
				this.props.companies.sort(
					(a: Company, b: Company): number => {
						return b.marketCap - a.marketCap;
					}
				);
				break;
			case 'SECTOR':
				this.props.companies.sort(
					(a: Company, b: Company): number => {
						return a.sector.toUpperCase().localeCompare(b.sector.toUpperCase());
					}
				);
				break;
			case 'SYMBOL':
				this.props.companies.sort(
					(a: Company, b: Company): number => {
						return a.symbol.toUpperCase().localeCompare(b.symbol.toUpperCase());
					}
				);
				break;
			default:
				this.props.companies.sort(
					(a: Company, b: Company): number => {
						return a.name.toUpperCase().localeCompare(b.name.toUpperCase());
					}
				);
				break;
		}
		// this.props.companies.sort(
		// 	(a: Company, b: Company): number => {
		// 		return b.marketCap - a.marketCap;
		// 	}
		// );
		this.forceUpdate();
	}
}

export default Companies;
