import {
	SERVER_URL,
	COMPANIES_PATH,
	COMPANIES_RESOURCE_URL,
	STOCK_PRICES_PATH,
	STOCK_PRICES_RESOURCE_URL,
	CRYPTOS_PATH,
	CRYPTOS_RESOURCE_URL,
	CRYPTO_PRICES_RESOURCE_URL
} from './constants';

describe('constants', () => {
	it('should define the server URL', () => {
		expect(SERVER_URL).toEqual('http://localhost:3000/');
	});

	it('should define the companies path', () => {
		expect(COMPANIES_PATH).toEqual('companies/');
	});

	it('should define the prices path', () => {
		expect(STOCK_PRICES_PATH).toEqual('stock-prices/');
	});

	it('should define the cryptos path', () => {
		expect(CRYPTOS_PATH).toEqual('cryptos/');
	});

	it('should define the full companies URL', () => {
		expect(COMPANIES_RESOURCE_URL).toEqual('http://localhost:3000/companies/');
	});

	it('should define the full stock prices URL', () => {
		expect(STOCK_PRICES_RESOURCE_URL).toEqual('http://localhost:3000/stock-prices/');
	});

	it('should define the full cryptos URL', () => {
		expect(CRYPTOS_RESOURCE_URL).toEqual('http://localhost:3000/cryptos/');
	});

	it('should define the full crypto prices URL', () => {
		expect(CRYPTO_PRICES_RESOURCE_URL).toEqual('http://localhost:3000/cryptos/');
	});
});
