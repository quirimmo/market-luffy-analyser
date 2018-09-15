import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import CompaniesPage from '../companies/Companies.container';
import HomePage from '../home/Home.container';
import './style.scss';
import CompanyPageContainer from '../company/CompanyPage.container';

class AppMainContent extends React.Component<{}> {
	constructor(props: {}) {
		super(props);

		this.getCompaniesPageRoute = this.getCompaniesPageRoute.bind(this);
		this.getHomePageRoute = this.getHomePageRoute.bind(this);
		this.getCompanyPageRoute = this.getCompanyPageRoute.bind(this);
	}

	public getCompaniesPageRoute(routeProps: any) {
		return <CompaniesPage />;
	}

	public getHomePageRoute(routeProps: any) {
		return <HomePage />;
	}

	public getCompanyPageRoute(routeProps: any) {
		return <CompanyPageContainer companySymbol={routeProps.match.params.symbol} />
	}

	public render() {
		return (
			<section className="main-content-section">
				<Row>
					<Col className="page-content-wrapper">
						<Switch>
							<Route path="/home" render={this.getHomePageRoute} />
							<Route path="/companies" render={this.getCompaniesPageRoute} />
							<Route path="/company/:symbol" render={this.getCompanyPageRoute} />
							<Redirect from="/" to="/home" />
						</Switch>
					</Col>
				</Row>
			</section>
		);
	}
}

export default AppMainContent;
