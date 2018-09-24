import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container, Alert } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './../../../assets/styles/main.scss';
import AppTitle from '../app-title/AppTitle.component';
import AppNavigation from '../app-navigation/AppNavigation.component';
import AppMainContent from '../app-main-content/AppMainContent.component';
import { Observable, forkJoin } from 'rxjs';
import Company from './../../models/Company';
import LoadingGears from '../shared/LoadingGears.component';

interface IAppProps {
	connectToSocket: () => Observable<any>;
	disconnectFromSocket: () => Observable<any>;
	fetchCompanies: () => Observable<Company[]>;
}

interface IAppState {
	isLoading: boolean;
	isError: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.state = { isLoading: false, isError: false };
	}

	public render() {
		const content = this.state.isLoading ? this.getLoadingContent() : this.state.isError ? this.getErrorContent() : this.getMainContent();
		return <BrowserRouter basename="/">{content}</BrowserRouter>;
	}

	public getErrorContent(): JSX.Element {
		return (
			<Alert className="text-center" color="danger">
				Error bootstrapping the application
			</Alert>
		);
	}

	public getLoadingContent(): JSX.Element {
		return <LoadingGears imgClasses="mt-5" />;
	}

	public getMainContent(): JSX.Element {
		return (
			<div>
				<AppNavigation />
				<Container className="main-app-wrapper">
					<AppTitle />
					<br />
					<AppMainContent />
				</Container>
			</div>
		);
	}

	public componentDidMount() {
		this.setState({ isError: false, isLoading: true });
		forkJoin(this.props.connectToSocket(), this.props.fetchCompanies()).subscribe(
			(data: any) => {
				this.setState({ isLoading: false });
			},
			(err: any) => {
				console.error('Error bootstrapping the application', err);
				this.setState({ isLoading: false, isError: true });
			}
		);
	}

	public componentWillUnmount() {
		this.props.disconnectFromSocket();
	}
}

export default App;
