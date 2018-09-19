import * as React from 'react';
import { Button, Collapse } from 'reactstrap';
import Utils from './../../utils/Utils';

interface IDailySerieCardPriceChangeProps {
	priceChange: number[];
	priceClasses?: string;
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
		const cssClasses = this.props.priceClasses || 'col-xl-2 col-lg-3 col-md-3 col-sm-3 col-3 text-left';
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
								className={`${cssClasses} p-0 price-change-value ${Utils.getBearishBullishClass(price)}`}
							>
								{`${price.toFixed(2)}%`}
							</div>
						))}
					</Collapse>
				</div>
			</div>
		);
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
