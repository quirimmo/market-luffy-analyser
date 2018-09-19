import DailySerie from './DailySerie';
import WebServiceProxy from './../services/WebServiceProxy';

class Company {
	public isVisible: boolean;
	public dailySerie: DailySerie | undefined;

	constructor(
		public symbol: string,
		public name: string,
		public lastSale: number,
		public marketCap: number,
		public sector: string,
		public industry: string
	) {
		this.isVisible = true;
		this.dailySerie = undefined;
	}

	public getPricesInfo() {
		WebServiceProxy.getCompanyPricesInfo(this.symbol);
	}
}

export default Company;
