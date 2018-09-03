import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './../../../assets/styles/main.scss';
import Company from 'models/Company';
import AppTitle from '../app-title/AppTitle.component';
import AppNavigation from '../app-navigation/AppNavigation.component';
import AppMainContent from '../app-main-content/AppMainContent.component';

class App extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	public render() {
		return (
			<BrowserRouter basename="/">
				<Container className="main-app-wrapper">
					<AppTitle />
					<br />
					<AppNavigation />
					<br />
					<AppMainContent />
				</Container>
			</BrowserRouter>
		);
	}
}

export default App;
