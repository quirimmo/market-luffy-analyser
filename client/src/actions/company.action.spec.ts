import * as companyActions from './company.action';
import Company from './../models/Company';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import WebServiceProxy from './../services/WebServiceProxy';
import { of } from 'rxjs';
import DailySerie from 'models/DailySerie';

const company: Company = new Company('Symbol 1', 'Name 1', 1, 2, 'Sector 1', 'Industry 1');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('company action', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should define the action types', () => {
		expect(companyActions.SELECT_COMPANY).toEqual('SELECT_COMPANY');
		expect(companyActions.FETCH_COMPANY).toEqual('FETCH_COMPANY');
	});

	it('should define the actions', () => {
		expect(typeof companyActions.selectCompany).toEqual('function');
		expect(typeof companyActions.fetchCompanyThunk).toEqual('function');
	});

	describe('selectCompany', () => {
		it('should return the action', () => {
			expect(companyActions.selectCompany(company)).toEqual({ type: companyActions.SELECT_COMPANY, company });
		});
	});

	describe('fetchCompanyThunk', () => {
		it('should trigger the no company error', (done: any) => {
			const store = mockStore({ companies: [] });
			companyActions
				.fetchCompanyThunk('Symbol 1')(store.dispatch, store.getState)
				.subscribe(() => {}, onError);

			function onError(err: any) {
				expect(err).toEqual('There is no company corresponding to the given symbol Symbol 1');
				done();
			}
		});

		it('should trigger the fetching data error', (done: any) => {
			spyOn(WebServiceProxy, 'getCompanyPricesInfo').and.throwError('ERROR');
			const store = mockStore({ companies: [company] });
			companyActions
				.fetchCompanyThunk('Symbol 1')(store.dispatch, store.getState)
				.subscribe(() => {}, onError);

			function onError(err: any) {
				expect(err).toEqual(new Error('ERROR'));
				done();
			}
		});

		it('should dispatch the selectCompany action with the modified company', (done: any) => {
			spyOn(WebServiceProxy, 'getCompanyPricesInfo').and.returnValue(
				of({
					response: {
						data: {
							'Symbol 1': {
								lastMovement: 1,
								priceChange: [2],
								trend: 3
							}
						}
					}
				})
			);
			const store = mockStore({ companies: [company] });
			const spy = jest.fn();
			companyActions
				.fetchCompanyThunk('Symbol 1')(spy, store.getState)
				.subscribe(onSubscribe);

			function onSubscribe(data: any) {
				expect(spy).toHaveBeenCalledWith({ type: 'SELECT_COMPANY', company });
				expect(company.dailySerie).toBeDefined();
				if (company.dailySerie) {
					const dailySerie: DailySerie = company.dailySerie;
					expect(dailySerie.lastMovement).toEqual(1);
					expect(dailySerie.priceChange).toEqual([2]);
					expect(dailySerie.trend).toEqual(3);
				}
				done();
			}
		});
	});
});
