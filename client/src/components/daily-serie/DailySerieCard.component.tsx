import * as React from 'react';
import DailySerie from './../../models/DailySerie';
import './style.scss';
import { Collapse, Button } from 'reactstrap';
import DailySerieCardInfoRow from './DailySerieCardInfoRow.component';
import DailySerieCardPriceChange from './DailySerieCardPriceChange.component';

interface IDailySerieCardProps {
	dailySerie: DailySerie;
}

interface IDailySerieCardState {
	isPriceChangesOpen: boolean;
}

class DailySerieCard extends React.Component<IDailySerieCardProps, IDailySerieCardState> {
	constructor(props: IDailySerieCardProps) {
		super(props);
		this.state = { isPriceChangesOpen: false };
		this.toggle = this.toggle.bind(this);
		this.getPriceChangesButtonText = this.getPriceChangesButtonText.bind(this);
	}

	public render() {
		return (
			<article className="daily-serie-card">
				<DailySerieCardInfoRow label="Symbol" value={this.props.dailySerie.symbol} />
				<DailySerieCardInfoRow
					label="Last Movement"
					classes={this.getBearishBullishClass(this.props.dailySerie.lastMovement)}
					value={`${this.props.dailySerie.lastMovement.toFixed(2)}%`}
				/>
				<DailySerieCardInfoRow
					label="Trend"
					classes={this.getBearishBullishClass(this.props.dailySerie.trend)}
					value={`${this.props.dailySerie.trend.toFixed(2)}%`}
				/>
				<DailySerieCardPriceChange priceChange={this.props.dailySerie.priceChange} />
			</article>
		);
	}

	public getBearishBullishClass(value: number): string {
		return Math.sign(value) > 0 ? 'bullish-value' : Math.sign(value) < 0 ? 'bearish-value' : '';
	}

	public toggle() {
		this.setState((prevState: any) => ({
			isPriceChangesOpen: !prevState.isPriceChangesOpen
		}));
	}

	public getPriceChangesButtonText(): string {
		return this.state.isPriceChangesOpen ? 'Hide Price Changes' : 'Show Price Changes';
	}
}

export default DailySerieCard;

// <div className="row text-center justify-content-center">
// 					<Button className="price-changes-button mt-2 mb-1" color="info" onClick={this.toggle}>
// 						{this.getPriceChangesButtonText()}
// 					</Button>
// 				</div>
// 				<div className="row text-center justify-content-center">
// 					<Collapse className="row company-card-details" isOpen={this.state.isPriceChangesOpen}>
// 						{this.props.dailySerie.priceChange.map((price: number, index: number) => (
// 							<div
// 								key={index}
// 								className={`col-xl-2 col-lg-3 col-md-3 col-sm-3 col-3 p-0 text-left price-change-value ${this.getBearishBullishClass(price)}`}
// 							>
// 								{`${price.toFixed(2)}%`}
// 							</div>
// 						))}
// 					</Collapse>
// 				</div>
