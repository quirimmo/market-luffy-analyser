import createBrowserHistory from './main-history';

describe('createBrowserHistory tests', () => {
	it('should be defined', () => {
		expect(createBrowserHistory).toBeDefined();
	});

	it('should be an object', () => {
		expect(typeof createBrowserHistory).toEqual('object');
	});
});
