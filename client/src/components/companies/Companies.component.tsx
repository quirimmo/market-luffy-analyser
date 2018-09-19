import * as React from 'react';
import Company from 'models/Company';
import CompanyCard from '../company/CompanyCard.component';
import FilterCompaniesPage from './FilterCompanies.container';
import SortCompanies from './SortCompanies.component';
import { Alert } from 'reactstrap';
import LoadingGears from '../shared/LoadingGears.component';

import './style.scss';
interface ICompaniesProps {
	companies: Company[];
	companySectors: string[];
	selectCompany: (company: Company | null) => void;
}

interface ICompaniesState {
	sectors: string[];
	isLoading: boolean;
}

class Companies extends React.Component<ICompaniesProps, ICompaniesState> {
	constructor(props: any) {
		super(props);
		this.state = {
			sectors: [],
			isLoading: true
		};
		this.onMapCompany = this.onMapCompany.bind(this);
		this.sortCompanies = this.sortCompanies.bind(this);
	}

	public render() {
		let mainContent: any;

		if (this.state.isLoading) {
			mainContent = <LoadingGears imgClasses="mt-5" />;
		} else {
			if (this.props.companies.length === 0) {
				mainContent = <Alert color="warning">The are no companies in the list</Alert>;
			} else {
				mainContent = (
					<div className="companies-section-wrapper">
						<FilterCompaniesPage sectors={this.state.sectors} />
						<hr />
						<SortCompanies sortCompanies={this.sortCompanies} />
						<br />
						<div className="row text-center">{this.props.companies.filter((company: Company) => company.isVisible).map(this.onMapCompany)}</div>
					</div>
				);
			}
		}

		return <div>{mainContent}</div>;
	}

	public onMapCompany(company: Company): JSX.Element | undefined {
		return company.isVisible ? (
			<div className="col-lg-3 col-md-4 col-sm-6" key={company.symbol}>
				<CompanyCard selectCompany={this.props.selectCompany} company={company} />
			</div>
		) : (
			undefined
		);
	}

	public componentDidMount() {
		const sectors = new Set(this.props.companies.map((company: Company) => company.sector));
		this.setState({ sectors: Array.from(sectors), isLoading: false });
	}

	public sortCompanies(activeSort: string): void {
		switch (activeSort) {
			case 'NAME':
				this.props.companies.sort((a: Company, b: Company): number => a.name.toUpperCase().localeCompare(b.name.toUpperCase()));
				break;
			case 'MARKET CAP':
				this.props.companies.sort((a: Company, b: Company): number => b.marketCap - a.marketCap);
				break;
			case 'SECTOR':
				this.props.companies.sort((a: Company, b: Company): number => a.sector.toUpperCase().localeCompare(b.sector.toUpperCase()));
				break;
			case 'SYMBOL':
				this.props.companies.sort((a: Company, b: Company): number => a.symbol.toUpperCase().localeCompare(b.symbol.toUpperCase()));
				break;
			default:
				this.props.companies.sort((a: Company, b: Company): number => a.name.toUpperCase().localeCompare(b.name.toUpperCase()));
				break;
		}
		this.forceUpdate();
	}
}

export default Companies;
