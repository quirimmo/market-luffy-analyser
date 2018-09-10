import Company from './Company';

interface IStoreState {
	companies: Company[];
	dailySeries: any[];
	companyName: string;
}

export default IStoreState;
