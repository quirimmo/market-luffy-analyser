import * as React from 'react';
import Company from 'models/Company';
import { Collapse, Button } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';

import './style.scss';
import CompanyCardInfoRow from './CompanyCardInfoRow.component';
export interface ICompanyProps {
	selectCompany: (company: Company | null) => void;
	company: Company;
	match: any;
	location: any;
	history: any;
}

class CompanyCard extends React.Component<ICompanyProps, any> {
	constructor(props: any) {
		super(props);
		this.state = { collapsed: false };
		this.toggle = this.toggle.bind(this);
		this.openCompanyPage = this.openCompanyPage.bind(this);
	}

	public render() {
		return (
			<article className="company-card">
				<Button className="company-button" color="secondary" onClick={this.toggle}>
					{this.props.company.name}
				</Button>
				<Collapse className="company-card-details" isOpen={this.state.collapsed}>
					<CompanyCardInfoRow label="Symbol" value={this.props.company.symbol} />
					<CompanyCardInfoRow label="Last Sale" value={Math.round(this.props.company.lastSale).toString()} />
					<CompanyCardInfoRow label="Market Cap" value={Math.round(this.props.company.marketCap).toString()} />
					<CompanyCardInfoRow label="Sector" value={this.props.company.sector} />
					<CompanyCardInfoRow label="Industry" value={this.props.company.industry} />
					<div className="row text-center justify-content-center">
						<Link to="/company/blablabla">React</Link>
						<Button color="success" className="mt-2 mb-1 company-page-button" onClick={this.openCompanyPage}>
							Company Page
						</Button>
					</div>
				</Collapse>
			</article>
		);
	}

	public toggle() {
		this.setState((prevState: any) => ({
			collapsed: !prevState.collapsed
		}));
	}

	public openCompanyPage() {
		this.props.selectCompany(this.props.company);
		this.props.history.push('/company/blablabla');
		// this.props.history.push({ pathname: '/company', search: 'symbol=blablabla', state: { symbol: 'blablabla' } });
		// this.props.history.push({
		// 	pathname: '/company',
		// 	state: { symbol: 'blablabla' }
		// });
		// console.log('props', this.props);
	}
}

export default withRouter(CompanyCard);
