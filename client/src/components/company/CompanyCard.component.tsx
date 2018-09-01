import * as React from 'react';
import Company from 'models/Company';
import { Collapse } from 'reactstrap';

import './style.scss';
export interface ICompanyProps {
	company: Company;
}

class CompanyCard extends React.Component<ICompanyProps, any> {
	constructor(props: any) {
		super(props);
		this.state = { collapsed: false };
		this.toggle = this.toggle.bind(this);
	}

	public render() {
		return (
			<article className="company-card">
				<button className="btn btn-lg btn-secondary company-button" onClick={this.toggle}>
					{this.props.company.name}
				</button>
				<Collapse className="company-card-details" isOpen={this.state.collapsed}>
					<div className="row">
						<div className="col-sm-4">Symbol:</div>
						<div className="col-sm-8 company-card-details-value">{this.props.company.symbol}</div>
					</div>
					<div className="row">
						<div className="col-sm-4">Last Sale:</div>
						<div className="col-sm-8 company-card-details-value">{this.props.company.lastSale}</div>
					</div>
					<div className="row">
						<div className="col-sm-4">Market Cap:</div>
						<div className="col-sm-8 company-card-details-value">{this.props.company.marketCap}</div>
					</div>
					<div className="row">
						<div className="col-sm-4">Sector:</div>
						<div className="col-sm-8 company-card-details-value">{this.props.company.sector}</div>
					</div>
					<div className="row">
						<div className="col-sm-4">Industry:</div>
						<div className="col-sm-8 company-card-details-value">{this.props.company.industry}</div>
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
}

export default CompanyCard;
