import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import CompaniesPage from '../companies/Companies.container';
import HomePage from '../home/Home.container';

class AppMainContent extends React.Component<{}> {
	constructor(props: {}) {
		super(props);

		this.getCompaniesPageRoute = this.getCompaniesPageRoute.bind(this);
		this.getHomePageRoute = this.getHomePageRoute.bind(this);
	}

	public getCompaniesPageRoute(routeProps: object) {
		return <CompaniesPage />;
	}

	public getHomePageRoute(routeProps: object) {
		return <HomePage />;
	}

	public render() {
		return (
			<section className="main-content-section">
				<Row>
					<Col className="page-content-wrapper">
						<Switch>
							<Route path="/home" render={this.getHomePageRoute} />
							<Route path="/companies" render={this.getCompaniesPageRoute} />
							<Redirect from="/" to="/home" />
						</Switch>
					</Col>
				</Row>
			</section>
		);
	}
}

export default AppMainContent;
