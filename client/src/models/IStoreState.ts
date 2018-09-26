import Company from './Company';
import DailySerie from './DailySerie';
import Crypto from './Crypto';

interface IStoreState {
	companies: Company[];
	dailySeries: DailySerie[];
	selectedCompany?: Company;
	cryptos: Crypto[];
}

export default IStoreState;
