import * as React from 'react';
import { shallow } from 'enzyme';
import Cryptos from './Cryptos.component';
import CryptoCard from '../crypto/CryptoCard.component';
import { Alert } from 'reactstrap';
import FilterCryptosPage from './FilterCryptos.container';
import SortCryptos from './SortCryptos.component';
import LoadingGears from '../shared/LoadingGears.component';
import Crypto from './../../models/Crypto';

let component: any;
const crypto1: Crypto = new Crypto('Symbol 2', 'Name 1');
const crypto2: Crypto = new Crypto('Symbol 1', 'Name 2');
crypto2.isVisible = false;
const cryptos: Crypto[] = [crypto1, crypto2];
const mockSelectCrypto = jest.fn();

describe.only('Cryptos Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<Cryptos selectCrypto={mockSelectCrypto} cryptos={cryptos} />);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should define the public methods', () => {
		expect(typeof component.instance().componentDidMount).toEqual('function');
		expect(typeof component.instance().sortCryptos).toEqual('function');
		expect(typeof component.instance().onMapCrypto).toEqual('function');
	});

	describe('init', () => {
		it('should init the cryptos prop', () => {
			expect(component.instance().props.cryptos).toEqual(cryptos);
		});

		it('should init the state', () => {
			expect(component.state()).toEqual({
				isLoading: false
			});
		});
	});

	describe('render', () => {
		describe('loading', () => {
			let loading: any;
			beforeEach(() => {
				component.setState({ isLoading: true });
				loading = component.find(LoadingGears);
			});
			afterEach(() => {
				component.setState({ isLoading: false });
			});

			it('should display the loading cryptos element', () => {
				expect(loading).toHaveLength(1);
			});

			it('should not display the other content', () => {
				expect(component.find(Alert)).toHaveLength(0);
				expect(component.find('.cryptos-section-wrapper')).toHaveLength(0);
			});
		});

		describe('no results', () => {
			let noResults: any;
			beforeEach(() => {
				component.setProps({ cryptos: [] });
				noResults = component.find(Alert);
			});
			afterEach(() => {
				component.setProps({ cryptos });
			});

			it('should display the no cryptos element', () => {
				expect(noResults).toHaveLength(1);
			});

			it('should display the no cryptos message', () => {
				expect(noResults.props().children).toEqual('The are no cryptos in the list');
			});

			it('should not display the other content', () => {
				expect(component.find(LoadingGears)).toHaveLength(0);
				expect(component.find('.cryptos-section-wrapper')).toHaveLength(0);
			});
		});

		describe('results', () => {
			let results: any;
			beforeEach(() => {
				results = component.find('.cryptos-section-wrapper');
			});

			it('should display the results container', () => {
				expect(results).toHaveLength(1);
			});

			it('should display the FilterCryptosPage component', () => {
				expect(results.find(FilterCryptosPage)).toHaveLength(1);
			});

			it('should display the SortCryptos component', () => {
				expect(results.find(SortCryptos)).toHaveLength(1);
			});

			it('should pass the sortCryptos method as prop of the SortCryptos', () => {
				expect(results.find(SortCryptos).props().sortCryptos).toEqual(component.instance().sortCryptos);
			});

			it('should define a CryptoCard component for each visible company in the prop', () => {
				expect(component.find(CryptoCard)).toHaveLength(1);
				expect(component.find(CryptoCard).props().crypto).toEqual(crypto1);
			});

			it('should not display the other contents', () => {
				expect(component.find(Alert)).toHaveLength(0);
				expect(component.find(LoadingGears)).toHaveLength(0);
			});
		});
	});

	describe('onMapCrypto', () => {
		it('should return undefined if the crypto is not visible', () => {
			expect(component.instance().onMapCrypto(crypto2)).toBeUndefined();
		});

		it('should return the crypto list element if the crypto is visible', () => {
			expect(component.instance().onMapCrypto(crypto1)).toEqual(
				<div className="col-xl-1 col-lg-2 col-md-3 col-sm-4 col-6" key={crypto1.symbol}>
					<CryptoCard selectCrypto={mockSelectCrypto} crypto={crypto1} />
				</div>
			);
		});
	});

	describe('sortCryptos', () => {
		beforeEach(() => {
			crypto2.isVisible = true;
		});
		afterEach(() => {
			crypto2.isVisible = false;
		});

		it('should call the forceUpdate method', () => {
			const spy = spyOn(component.instance(), 'forceUpdate');
			component.instance().sortCryptos();
			expect(spy).toHaveBeenCalled();
		});

		it('should sort the cryptos by name', () => {
			component.instance().sortCryptos('NAME');
			expect(component.instance().props.cryptos).toEqual(cryptos);
		});

		it('should sort the companies by symbol', () => {
			component.instance().sortCryptos('SYMBOL');
			expect(component.instance().props.cryptos).toEqual([crypto2, crypto1]);
		});
	});
});
