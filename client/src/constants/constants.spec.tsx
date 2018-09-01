import { SERVER_URL, COMPANIES_PATH, COMPANIES_RESOURCE_URL } from './constants';

describe('constants', () => {
	it('should define the server URL', () => {
		expect(SERVER_URL).toEqual('http://localhost:3000/');
	});

	it('should define the companies path', () => {
		expect(COMPANIES_PATH).toEqual('companies/');
	});

	it('should define the full companies URL', () => {
		expect(COMPANIES_RESOURCE_URL).toEqual('http://localhost:3000/companies/');
	});
});
