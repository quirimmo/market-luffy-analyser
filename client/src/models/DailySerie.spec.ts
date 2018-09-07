import DailySerie from './DailySerie';

const instance: DailySerie = new DailySerie('Symbol 1', 1, [2, 3], 4);

describe('DailySerie', () => {
	it('should be defined', () => {
		expect(DailySerie).toBeDefined();
	});

	it('should create an instance of the class', () => {
		expect(instance instanceof DailySerie).toBeTruthy();
	});

	describe('constructor', () => {
		it('should init the attributes', () => {
			expect(instance.symbol).toEqual('Symbol 1');
			expect(instance.lastMovement).toEqual(1);
			expect(instance.priceChange).toEqual([2, 3]);
			expect(instance.trend).toEqual(4);
		});
	});
});
