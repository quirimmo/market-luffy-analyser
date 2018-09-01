import * as React from 'react';
import Company from 'models/Company';
import { Collapse } from 'reactstrap';

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
			<article>
				<div onClick={this.toggle}>{this.props.company.name}</div>
				<Collapse isOpen={this.state.collapsed}>
					<div>{this.props.company.symbol}</div>
					<div>{this.props.company.lastSale}</div>
					<div>{this.props.company.marketCap}</div>
					<div>{this.props.company.sector}</div>
					<div>{this.props.company.industry}</div>
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
