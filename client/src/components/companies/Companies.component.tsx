import * as React from 'react';
import Company from 'models/Company';
import CompanyCard from '../company/CompanyCard.component';
import { Observable } from 'rxjs';
import FilterCompaniesPage from './FilterCompanies.container';

import './style.scss';
import SortCompanies from './SortCompanies.component';
import { Alert } from 'reactstrap';

interface ICompaniesProps {
	companies: Company[];
	companySectors: string[];
	fetchCompanies: () => Observable<Company[]>;
	selectCompany: (company: Company | null) => void;
}

interface ICompaniesState {
	sectors: string[];
	isLoading: boolean;
	isError: boolean;
}

class Companies extends React.Component<ICompaniesProps, ICompaniesState> {
	constructor(props: any) {
		super(props);
		this.state = {
			sectors: [],
			isLoading: true,
			isError: false
		};
		this.onMapCompany = this.onMapCompany.bind(this);
		this.sortCompanies = this.sortCompanies.bind(this);
	}

	public render() {
		let mainContent: any;

		if (this.state.isError) {
			mainContent = <Alert color="danger">Error fetching the companies</Alert>;
		} else if (this.state.isLoading) {
			mainContent = (
				<div className="row text-center">
					<div className="loading-companies-message row text-center">Loading companies...</div>
				</div>
			);
		} else {
			if (this.props.companies.length === 0) {
				mainContent = (
					<div className="no-companies-message row text-center">
						<div>There are no companies</div>
					</div>
				);
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
		const instance: Companies = this;
		this.setState((prevState: ICompaniesState) => ({
			...prevState,
			isLoading: true
		}));
		this.props.fetchCompanies().subscribe(onSubscribe, onError);

		function onSubscribe(companies: Company[]): void {
			const sectors = new Set(instance.props.companies.map((company: Company) => company.sector));
			instance.setState({ sectors: Array.from(sectors), isLoading: false });
		}

		function onError(err: any): void {
			console.error('Error fetching the list of companies!', err);
			instance.setState((prevState: ICompaniesState) => ({ ...prevState, isError: true }));
		}
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
