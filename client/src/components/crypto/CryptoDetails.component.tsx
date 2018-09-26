import * as React from 'react';
import Crypto from './../../models/Crypto';
import DailySerie from './../../models/DailySerie';
import DailySerieCardPriceChange from '../daily-serie/DailySerieCardPriceChange.component';
import NumberFormatter from '../shared/NumberFormatter.component';
import Utils from './../../utils/Utils';
import DailySerieDetails from '../daily-serie/DailySerieDetails.component';

interface ICryptoDetailsProps {
	crypto: Crypto;
}

class CryptoDetails extends React.Component<ICryptoDetailsProps, any> {
	public constructor(props: ICryptoDetailsProps) {
		super(props);
	}

	public render() {
		const dailySerie: DailySerie = this.props.crypto.dailySerie ? this.props.crypto.dailySerie : new DailySerie('0', 0, [0], 0);
		return (
			<div>
				<DailySerieDetails dailySerie={dailySerie} />
				<br />
				<DailySerieCardPriceChange priceClasses="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-3 text-center" priceChange={dailySerie.priceChange} />
			</div>
		);
	}
}

export default CryptoDetails;
