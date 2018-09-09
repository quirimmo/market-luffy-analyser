import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './../../../assets/styles/main.scss';
import AppTitle from '../app-title/AppTitle.component';
import AppNavigation from '../app-navigation/AppNavigation.component';
import AppMainContent from '../app-main-content/AppMainContent.component';
import { Observable } from 'rxjs';

interface IAppProps {
	connectToSocket: () => Observable<any>;
	disconnectFromSocket: () => Observable<any>;
}

class App extends React.Component<IAppProps, any> {
	constructor(props: any) {
		super(props);
	}

	public render() {
		return (
			<BrowserRouter basename="/">
				<div>
					<AppNavigation />
					<Container className="main-app-wrapper">
						<AppTitle />
						<br />
						<AppMainContent />
					</Container>
				</div>
			</BrowserRouter>
		);
	}

	public componentDidMount() {
		// connect to the web socket when the app starts
		this.props.connectToSocket();
	}

	public componentWillUnmount() {
		// disconnect from the web socket when the app starts
		this.props.disconnectFromSocket();
	}
}

export default App;
