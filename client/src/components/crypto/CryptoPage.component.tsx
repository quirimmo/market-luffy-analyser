import * as React from 'react';
import Crypto from './../../models/Crypto';
import { Alert } from 'reactstrap';
import { Observable } from 'rxjs';
import LoadingGears from '../shared/LoadingGears.component';
import CryptoDetails from './CryptoDetails.component';

interface ICryptoPageProps {
	crypto: Crypto;
	fetchCrypto: () => Observable<boolean>;
}

interface ICryptoPageState {
	isError: boolean;
	isLoading: boolean;
}

class CompanyPage extends React.Component<ICryptoPageProps, ICryptoPageState> {
	constructor(props: ICryptoPageProps) {
		super(props);
		this.state = {
			isError: false,
			isLoading: false
		};
		this.getLoadingContent = this.getLoadingContent.bind(this);
		this.getErrorContent = this.getErrorContent.bind(this);
		this.getCryptoContent = this.getCryptoContent.bind(this);
	}

	public render() {
		return this.state.isLoading
			? this.getLoadingContent()
			: this.state.isError || this.props.crypto === null
				? this.getErrorContent()
				: this.getCryptoContent();
	}

	public getLoadingContent(): JSX.Element {
		return <LoadingGears imgClasses="mt-5" />;
	}

	public getErrorContent(): JSX.Element {
		return <Alert color="danger">Error retrieving the crypto</Alert>;
	}

	public getCryptoContent(): JSX.Element {
		return (
			<div>
				<div className="row text-center justify-content-center text-uppercase font-weight-bold">{this.props.crypto.name}</div>
				<div className="row text-center justify-content-center text-uppercase font-italic">{this.props.crypto.symbol}</div>
				<br />
				<CryptoDetails crypto={this.props.crypto} />
			</div>
		);
	}

	public componentDidMount() {
		this.setState((prevState: ICryptoPageState) => ({ ...prevState, isLoading: true }));
		this.props.fetchCrypto().subscribe(
			(data: any) => {
				this.setState({ isError: false, isLoading: false });
			},
			(err: any) => {
				this.setState({ isError: true, isLoading: false });
				console.error('Error fetching the crypto', err, this.props.crypto);
			}
		);
	}
}

export default CompanyPage;
