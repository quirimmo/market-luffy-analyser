import reducers from './reducers';

describe('reducers tests', () => {
	it('should be defined', () => {
		expect(reducers).toBeDefined();
	});

	it('should be a function', () => {
		expect(typeof reducers).toEqual('function');
	});
});
