import * as React from 'react';
import Company from 'models/Company';
import { Collapse, Button } from 'reactstrap';

import './style.scss';
import CompanyCardInfoRow from './CompanyCardInfoRow.component';
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
				<Button className="company-button" color="secondary" onClick={this.toggle}>{this.props.company.name}</Button>
				<Collapse className="company-card-details" isOpen={this.state.collapsed}>
					<CompanyCardInfoRow label="Symbol" value={this.props.company.symbol} />
					<CompanyCardInfoRow label="Last Sale" value={Math.round(this.props.company.lastSale).toString()} />
					<CompanyCardInfoRow label="Market Cap" value={Math.round(this.props.company.marketCap).toString()} />
					<CompanyCardInfoRow label="Sector" value={this.props.company.sector} />
					<CompanyCardInfoRow label="Industry" value={this.props.company.industry} />
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
