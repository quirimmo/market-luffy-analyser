import Utils from './Utils';

describe('Utils', () => {
	it('should be defined', () => {
		expect(Utils).toBeDefined();
	});

	it('should define the exposed methods', () => {
		expect(typeof Utils.getBearishBullishClass).toEqual('function');
	});

	describe('getBearishBullishClass', () => {
		it('should return the bearish class', () => {
			expect(Utils.getBearishBullishClass(-1)).toEqual('bearish-value');
		});
		it('should return the bullish class', () => {
			expect(Utils.getBearishBullishClass(1)).toEqual('bullish-value');
		});
		it('should not return any class', () => {
			expect(Utils.getBearishBullishClass(0)).toEqual('');
		});
	});
});
