import * as React from 'react';
import { shallow } from 'enzyme';
import { CryptoCard } from './CryptoCard.component';
import Crypto from './../../models/Crypto';
import { Button } from 'reactstrap';

let component: any;
const crypto: Crypto = new Crypto('Symbol', 'Name');
const mockSelectCrypto = jest.fn();
const match: any = {};
const location: any = {};
const mockHistoryPush = jest.fn();
const history: any = {
	push: mockHistoryPush
};

describe('Company Card Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<CryptoCard selectCrypto={mockSelectCrypto} crypto={crypto} match={match} location={location} history={history} />);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should define the public methods', () => {
		expect(typeof component.instance().openCryptoPage).toEqual('function');
	});

	describe('render', () => {
		it('should contain the article with class crypto-card', () => {
			const el = component.find('article');
			expect(el).toHaveLength(1);
			expect(el.hasClass('crypto-card')).toBeTruthy();
		});

		it('should display the div elements', () => {
			expect(component.find('div')).toHaveLength(2);
		});

		it('should display the crypto name', () => {
			expect(component.find('div').at(0).text()).toEqual('Name');
		});

		it('should display the crypto symbol', () => {
			expect(component.find('div').at(1).text()).toEqual('Symbol');
		});

		it('should display the Button', () => {
			const button = component.find(Button);
			expect(button).toHaveLength(1);
			expect(button.props().children).toEqual('Crypto Page');
			expect(button.props().onClick).toEqual(component.instance().openCryptoPage);
		});
	});

	describe('openCryptoPage', () => {
		it('should call the selectCrypto method', () => {
			component.instance().openCryptoPage();
			expect(mockSelectCrypto).toHaveBeenCalledWith(crypto);
		});

		it('should call the history push', () => {
			component.instance().openCryptoPage();
			expect(mockHistoryPush).toHaveBeenCalledWith('/crypto/Symbol');
		});
	});
});
