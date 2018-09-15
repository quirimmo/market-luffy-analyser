import * as React from 'react';
import Company from './../../models/Company';
import { Alert } from 'reactstrap';
import { Observable } from 'rxjs';

interface ICompanyPageProps {
	company: Company | null;
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
	}

	public render() {
		return this.state.isLoading ? this.getLoadingContent() : this.state.isError ? this.getErrorContent() : this.getCompanyContent();
	}

	public getLoadingContent(): JSX.Element {
		return <div>LOADING COMPANY DATA...</div>;
	}

	public getErrorContent(): JSX.Element {
		return <Alert color="danger">Error retrieving the company</Alert>;
	}

	public getCompanyContent(): JSX.Element {
		return <div>COMPANY CONTENT</div>;
	}

	public componentDidMount() {
		this.setState((prevState: ICompanyPageState) => ({ ...prevState, isLoading: true }));
		this.props.fetchCompany().subscribe((data: any) => {
			this.setState({ isError: !this.props.company || this.props.company === null, isLoading: false });
		});
	}
}

export default CompanyPage;
