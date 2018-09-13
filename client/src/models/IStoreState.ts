import Company from './Company';

interface IStoreState {
	companies: Company[];
	dailySeries: any[];
	selectedCompany: Company | null;
}

export default IStoreState;
