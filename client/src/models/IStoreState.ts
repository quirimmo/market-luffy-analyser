import Company from './Company';

interface IStoreState {
	companies: Company[];
	dailySeries: any[];
	companyName: string;
	companySectors: string[];
}

export default IStoreState;
