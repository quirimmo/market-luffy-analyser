import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './../../../assets/styles/main.scss';
import AppTitle from '../app-title/AppTitle.component';
import AppNavigation from '../app-navigation/AppNavigation.component';
import AppMainContent from '../app-main-content/AppMainContent.component';
import { Observable, forkJoin } from 'rxjs';
import Company from './../../models/Company';
import { timeout, delay } from 'rxjs/operators';
import LoadingGears from '../shared/LoadingGears.component';

interface IAppProps {
	connectToSocket: () => Observable<any>;
	disconnectFromSocket: () => Observable<any>;
	fetchCompanies: () => Observable<Company[]>;
}

interface IAppState {
	isLoading: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.state = { isLoading: false };
	}

	public render() {
		const content = this.state.isLoading ? this.getLoadingContent() : this.getMainContent();
		return <BrowserRouter basename="/">{content}</BrowserRouter>;
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
		this.setState({ isLoading: true });
		forkJoin(this.props.connectToSocket(), this.props.fetchCompanies()).subscribe((data: any) => {
			this.setState({ isLoading: false });
		});
	}

	public componentWillUnmount() {
		// disconnect from the web socket when the app starts
		this.props.disconnectFromSocket();
	}
}

export default App;
