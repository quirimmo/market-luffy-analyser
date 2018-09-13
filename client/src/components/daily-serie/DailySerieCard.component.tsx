import * as React from 'react';
import DailySerie from './../../models/DailySerie';
import './style.scss';
import DailySerieCardInfoRow from './DailySerieCardInfoRow.component';
import DailySerieCardPriceChange from './DailySerieCardPriceChange.component';
import Utils from './../../utils/Utils';

interface IDailySerieCardProps {
	dailySerie: DailySerie;
}

class DailySerieCard extends React.Component<IDailySerieCardProps, any> {
	constructor(props: IDailySerieCardProps) {
		super(props);
	}

	public render() {
		return (
			<article className="daily-serie-card">
				<DailySerieCardInfoRow label="Symbol" value={this.props.dailySerie.symbol} />
				<DailySerieCardInfoRow
					label="Last Movement"
					classes={Utils.getBearishBullishClass(this.props.dailySerie.lastMovement)}
					value={`${this.props.dailySerie.lastMovement.toFixed(2)}%`}
				/>
				<DailySerieCardInfoRow
					label="Trend"
					classes={Utils.getBearishBullishClass(this.props.dailySerie.trend)}
					value={`${this.props.dailySerie.trend.toFixed(2)}%`}
				/>
				<DailySerieCardPriceChange priceChange={this.props.dailySerie.priceChange} />
			</article>
		);
	}
}

export default DailySerieCard;
