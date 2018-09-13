import IStoreState from './IStoreState';
import Company from './../models/Company';
import DailySerie from './../models/DailySerie';

const company: Company = new Company('Symbol 1', 'Company 1', 1, 2, 'Sector 1', 'Industry 1');
const dailySerie: DailySerie = new DailySerie('Symbol 1', 1, [2, 3], 4);

const storeState: IStoreState = {
	companies: [company],
	dailySeries: [dailySerie],
	selectedCompany: null
};

describe('StoreState', () => {
	it('should be defined', () => {
		expect(storeState).toBeDefined();
	});

	it('should set the properties', () => {
		expect(storeState.companies).toEqual([company]);
		expect(storeState.dailySeries).toEqual([dailySerie]);
	});
});
