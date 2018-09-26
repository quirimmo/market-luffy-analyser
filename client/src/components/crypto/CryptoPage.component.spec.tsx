import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Crypto from './../../models/Crypto';
import DailySerie from './../../models/DailySerie';
import CryptoPage from './CryptoPage.component';
import { of, Observable, Observer } from 'rxjs';
import CryptoDetails from './CryptoDetails.component';
import LoadingGears from '../shared/LoadingGears.component';
import { Alert } from 'reactstrap';

const crypto: Crypto = new Crypto('Symbol', 'Name');
crypto.dailySerie = new DailySerie('Symbol', 1, [2, 3], 4);
const mockFetchCrypto = jest.fn(() => of(null));
let component: any;

describe('CompanyPage', () => {
	beforeEach(() => {
		component = shallow(<CryptoPage crypto={crypto} fetchCrypto={mockFetchCrypto} />);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should expose the public methods', () => {
		expect(typeof component.instance().getLoadingContent).toEqual('function');
		expect(typeof component.instance().getErrorContent).toEqual('function');
		expect(typeof component.instance().getCryptoContent).toEqual('function');
	});

	it('should init the state', () => {
		expect(component.state().isError).toBeFalsy();
		expect(component.state().isLoading).toBeFalsy();
	});

	describe('render', () => {
		it('should display the CryptoDetails component', () => {
			const cryptoDetails = component.find(CryptoDetails);
			expect(cryptoDetails).toHaveLength(1);
			expect(cryptoDetails.props().crypto).toEqual(crypto);
		});

		it('should not display the loading content', () => {
			expect(component.find(LoadingGears)).toHaveLength(0);
		});

		it('should not display the error content', () => {
			expect(component.find(Alert)).toHaveLength(0);
		});
	});

	describe('getLoadingContent', () => {
		it('should return the LoadingGears component', () => {
			expect(component.instance().getLoadingContent()).toEqual(<LoadingGears imgClasses="mt-5" />);
		});
	});

	describe('getErrorContent', () => {
		it('should return the Alert component', () => {
			expect(component.instance().getErrorContent()).toEqual(<Alert color="danger">Error retrieving the crypto</Alert>);
		});
	});

	describe('getCryptoContent', () => {
		it('should return the CryptoDetails component', () => {
			expect(component.instance().getCryptoContent()).toEqual(
				<div>
					<div className="row text-center justify-content-center text-uppercase font-weight-bold">Name</div>
					<div className="row text-center justify-content-center text-uppercase font-italic">Symbol</div>
					<br />
					<CryptoDetails crypto={crypto} />
				</div>
			);
		});
	});

	describe('componentDidMount', () => {
		it('should call twice the setState method', () => {
			const spy = spyOn(component, 'setState');
			component.instance().componentDidMount();
			expect(spy).toHaveBeenCalledTimes(2);
		});

		it('should call the fetchCrypto method', () => {
			component.instance().componentDidMount();
			expect(mockFetchCrypto).toHaveBeenCalled();
		});

		it('should keep the isError to false and isLoading to false', () => {
			component.instance().componentDidMount();
			expect(component.state().isError).toBeFalsy();
			expect(component.state().isLoading).toBeFalsy();
		});

		describe('error', () => {
			let spy: any;
			let mockFetchCryptoError: any;

			beforeEach(() => {
				spy = spyOn(console, 'error');
				mockFetchCryptoError = jest.fn(() => {
					const observable = new Observable((observer: Observer<boolean>) => {
						observer.error('ERROR');
					});
					return observable;
				});
			});

			it('should log the error', () => {
				shallow(<CryptoPage crypto={crypto} fetchCrypto={mockFetchCryptoError} />);
				expect(spy).toHaveBeenCalledWith('Error fetching the crypto', 'ERROR', crypto);
			});

			it('should set the isError prop of the state to true', () => {
				const comp: any = shallow(<CryptoPage crypto={crypto} fetchCrypto={mockFetchCryptoError} />);
				expect(comp.state().isError).toBeTruthy();
			});
		});
	});
});
