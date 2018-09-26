import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import './style.scss';

import CompaniesPage from '../companies/Companies.container';
import HomePage from '../home/Home.container';
import CompanyPageContainer from '../company/CompanyPage.container';
import CryptosPage from '../cryptos/Cryptos.container';
import CryptoPageContainer from '../crypto/CryptoPage.container';

class AppMainContent extends React.Component<{}> {
	constructor(props: {}) {
		super(props);

		this.getCompaniesPageRoute = this.getCompaniesPageRoute.bind(this);
		this.getHomePageRoute = this.getHomePageRoute.bind(this);
		this.getCompanyPageRoute = this.getCompanyPageRoute.bind(this);
		this.getCryptosPageRoute = this.getCryptosPageRoute.bind(this);
		this.getCryptoPageRoute = this.getCryptoPageRoute.bind(this);
	}

	public getCompaniesPageRoute(routeProps: any) {
		return <CompaniesPage />;
	}

	public getHomePageRoute(routeProps: any) {
		return <HomePage />;
	}

	public getCompanyPageRoute(routeProps: any) {
		return <CompanyPageContainer companySymbol={routeProps.match.params.symbol} />;
	}

	public getCryptosPageRoute(routeProps: any) {
		return <CryptosPage />;
	}

	public getCryptoPageRoute(routeProps: any) {
		return <CryptoPageContainer cryptoSymbol={routeProps.match.params.symbol} />;
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
							<Route path="/cryptos" render={this.getCryptosPageRoute} />
							<Route path="/crypto/:symbol" render={this.getCryptoPageRoute} />
							<Redirect from="/" to="/home" />
						</Switch>
					</Col>
				</Row>
			</section>
		);
	}
}

export default AppMainContent;
