import * as React from 'react';
import { Button, Collapse } from 'reactstrap';

interface IDailySerieCardPriceChangeProps {
	priceChange: number[];
}

interface IDailySerieCardPriceChangeState {
	isOpen: boolean;
}

class DailySerieCardPriceChange extends React.Component<IDailySerieCardPriceChangeProps, IDailySerieCardPriceChangeState> {
	public constructor(props: IDailySerieCardPriceChangeProps) {
		super(props);
		this.state = { isOpen: false };
		this.toggle = this.toggle.bind(this);
		this.getPriceChangesButtonText = this.getPriceChangesButtonText.bind(this);
	}

	public render() {
		return (
			<div>
				<div className="row text-center justify-content-center">
					<Button className="price-changes-button mt-2 mb-1" color="info" onClick={this.toggle}>
						{this.getPriceChangesButtonText()}
					</Button>
				</div>
				<div className="row text-center justify-content-center">
					<Collapse className="row company-card-details" isOpen={this.state.isOpen}>
						{this.props.priceChange.map((price: number, index: number) => (
							<div
								key={index}
								className={`col-xl-2 col-lg-3 col-md-3 col-sm-3 col-3 p-0 text-left price-change-value ${this.getBearishBullishClass(price)}`}
							>
								{`${price.toFixed(2)}%`}
							</div>
						))}
					</Collapse>
				</div>
			</div>
		);
	}

	public getBearishBullishClass(value: number): string {
		return Math.sign(value) > 0 ? 'bullish-value' : Math.sign(value) < 0 ? 'bearish-value' : '';
	}

	public toggle() {
		this.setState((prevState: any) => ({
			isOpen: !prevState.isOpen
		}));
	}

	public getPriceChangesButtonText(): string {
		return this.state.isOpen ? 'Hide Price Changes' : 'Show Price Changes';
	}
}

export default DailySerieCardPriceChange;
