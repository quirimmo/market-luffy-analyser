import DailySerie from './DailySerie';
import WebServiceProxy from './../services/WebServiceProxy';

class Crypto {
	public isVisible: boolean;
	public dailySerie: DailySerie | undefined;

	constructor(public symbol: string, public name: string) {
		this.isVisible = true;
		this.dailySerie = undefined;
	}

	// public getPricesInfo() {
	// 	WebServiceProxy.getCompanyPricesInfo(this.symbol);
	// }
}

export default Crypto;
