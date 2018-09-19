import Company from './Company';
import DailySerie from './DailySerie';

interface IStoreState {
	companies: Company[];
	dailySeries: DailySerie[];
	selectedCompany?: Company;
}

export default IStoreState;
