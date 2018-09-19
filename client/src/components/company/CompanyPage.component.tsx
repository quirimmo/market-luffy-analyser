import * as React from 'react';
import Company from './../../models/Company';
import { Alert } from 'reactstrap';
import { Observable } from 'rxjs';
import LoadingGears from '../shared/LoadingGears.component';
import CompanyDetails from './CompanyDetails.component';

interface ICompanyPageProps {
	company: Company;
	fetchCompany: () => Observable<boolean>;
}

interface ICompanyPageState {
	isError: boolean;
	isLoading: boolean;
}

class CompanyPage extends React.Component<ICompanyPageProps, ICompanyPageState> {
	constructor(props: ICompanyPageProps) {
		super(props);
		this.state = {
			isError: false,
			isLoading: false
		};
		this.getLoadingContent = this.getLoadingContent.bind(this);
		this.getErrorContent = this.getErrorContent.bind(this);
		this.getCompanyContent = this.getCompanyContent.bind(this);
	}

	public render() {
		return this.state.isLoading
			? this.getLoadingContent()
			: this.state.isError || this.props.company === null
				? this.getErrorContent()
				: this.getCompanyContent();
	}

	public getLoadingContent(): JSX.Element {
		return <LoadingGears imgClasses="mt-5" />;
	}

	public getErrorContent(): JSX.Element {
		return <Alert color="danger">Error retrieving the company</Alert>;
	}

	public getCompanyContent(): JSX.Element {
		return (
			<div>
				<div className="row text-center justify-content-center text-uppercase font-weight-bold">{this.props.company.name}</div>
				<div className="row text-center justify-content-center text-uppercase font-italic">{this.props.company.symbol}</div>
				<CompanyDetails company={this.props.company} />
			</div>
		);
	}

	public componentDidMount() {
		this.setState((prevState: ICompanyPageState) => ({ ...prevState, isLoading: true }));
		this.props.fetchCompany().subscribe(
			(data: any) => {
				this.setState({ isError: false, isLoading: false });
			},
			(err: any) => {
				this.setState({ isError: true, isLoading: false });
				console.error('Error fetching the company', err, this.props.company);
			}
		);
	}
}

export default CompanyPage;
