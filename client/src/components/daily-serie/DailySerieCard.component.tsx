import * as React from 'react';
import DailySerie from './../../models/DailySerie';
import './style.scss';
import { Collapse, Button } from 'reactstrap';

interface IDailySerieProps {
	dailySerie: DailySerie;
}

class DailySerieCard extends React.Component<IDailySerieProps, any> {
	constructor(props: IDailySerieProps) {
		super(props);
		this.state = { collapsed: false };
		this.toggle = this.toggle.bind(this);
	}

	public render() {
		return (
			<article className="daily-serie-card">
				<div className="row">
					<div className="col-sm-7">Symbol:</div>
					<div className="col-sm-5 daily-serie-card-details-value">{this.props.dailySerie.symbol}</div>
				</div>
				<div className="row">
					<div className="col-sm-7">Last Movement:</div>
					<div className={`col-sm-5 daily-serie-card-details-value ${this.getBearishBullishClass(this.props.dailySerie.lastMovement)}`}>
						{this.props.dailySerie.lastMovement.toFixed(2)} %
					</div>
				</div>
				<div className="row">
					<div className="col-sm-7">Trend:</div>
					<div className={`col-sm-5 daily-serie-card-details-value ${this.getBearishBullishClass(this.props.dailySerie.trend)}`}>
						{this.props.dailySerie.trend.toFixed(2)} %
					</div>
				</div>
				<div>
					<div className="row text-center justify-content-center">
						<Button className="price-changes-button" color="info" onClick={this.toggle}>
							Show Price Changes
						</Button>
					</div>
					<div className="row text-center justify-content-center">
						<Collapse className="row company-card-details" isOpen={this.state.collapsed}>
							{this.props.dailySerie.priceChange.map((price: number, index: number) => (
								<div key={index} className={`col-lg-3 col-md-3 col-sm-4 col-3 text-left price-change-value ${this.getBearishBullishClass(price)}`}>
									{`${price.toFixed(2)}%`}
								</div>
							))}
						</Collapse>
					</div>
				</div>
			</article>
		);
	}

	// <div className="col-sm-4">Price Change:</div>
	// 				<div className={`col-sm-8 daily-serie-card-details-value`}>
	// 					{this.props.dailySerie.priceChange.map((price: number) => (
	// 						<div className={this.getBearishBullishClass(price)}>{price.toFixed(2)} %</div>
	// 					))}
	// 				</div>

	public getBearishBullishClass(value: number): string {
		return Math.sign(value) > 0 ? 'bullish-value' : Math.sign(value) < 0 ? 'bearish-value' : '';
	}

	public toggle() {
		console.log('toggling', this.state.collapsed);
		this.setState((prevState: any) => ({
			collapsed: !prevState.collapsed
		}));
	}
}

export default DailySerieCard;
