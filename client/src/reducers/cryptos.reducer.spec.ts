import Crypto from './../models/Crypto';
import { FETCH_CRYPTOS_FULFILLED } from './../actions/cryptos.action';
import cryptos from './cryptos.reducer';

const NOT_EXISTENT_ACTION = {
	type: 'NOT_EXISTENT',
	cryptos: ['BLA']
};
const crypto1 = new Crypto('Symbol 1', 'Crypto 1');
const crypto2 = new Crypto('Symbol 2', 'Crypto 2');
const allCryptos = [crypto1, crypto2];
const FETCH_CRYPTOS_ACTION = {
	type: FETCH_CRYPTOS_FULFILLED,
	cryptos: [crypto1]
};
// const TOGGLE_COMPANY_VISIBILITY_ACTION = {
// 	type: TOGGLE_COMPANY_VISIBILITY
// };

describe('cryptos', () => {
	it('should be defined', () => {
		expect(cryptos).toBeDefined();
		expect(typeof cryptos).toEqual('function');
	});

	it('should return the initial state if the action not exist', () => {
		expect(cryptos([], NOT_EXISTENT_ACTION)).toEqual([]);
	});

	it('should concatenate the cryptos into the state', () => {
		expect(cryptos([], FETCH_CRYPTOS_ACTION)).toEqual([crypto1]);
	});

	// it('should not toggle the companies visibility', () => {
	// 	expect(companies(allCompanies, TOGGLE_COMPANY_VISIBILITY_ACTION)).toEqual([COMPANY1, COMPANY2]);
	// });

	// it('should toggle visibility by sector', () => {
	// 	const newVisibilityAction = Object.assign({}, TOGGLE_COMPANY_VISIBILITY_ACTION, { companySectors: ['SECTOR 1'], companyName: '' });
	// 	expect(companies(allCompanies, newVisibilityAction).filter((company: Company) => company.isVisible)).toEqual([COMPANY1, COMPANY2]);
	// });

	// it('should toggle visibility by name', () => {
	// 	const newVisibilityAction = Object.assign({}, TOGGLE_COMPANY_VISIBILITY_ACTION, { companySectors: ['SECTOR 1'], companyName: 'COMPANY 1' });
	// 	expect(companies(allCompanies, newVisibilityAction).filter((company: Company) => company.isVisible)).toEqual([COMPANY1]);
	// });
});
