import DailySerie from './DailySerie';
import DailyTime from './DailyTime';

const instance: DailySerie = new DailySerie('Symbol 1', 1, [3, 1, -5, 8], 4);
const prices: any = [
	{
		time: '2013-08-04',
		open: 0,
		high: 1,
		low: 2,
		close: 3,
		volume: 4,
		decimalsPrecision: 1
	},
	{
		time: '2013-08-03',
		open: 0,
		high: 1,
		low: 2,
		close: 1,
		volume: 4,
		decimalsPrecision: 1
	},
	{
		time: '2012-08-02',
		open: 0,
		high: 1,
		low: 2,
		close: -5,
		volume: 4,
		decimalsPrecision: 1
	},
	{
		time: '2012-08-01',
		open: 0,
		high: 1,
		low: 2,
		close: 8,
		volume: 4,
		decimalsPrecision: 1
	}
];
const dailyTime1: DailyTime = new DailyTime('2013-08-04', 0, 1, 2, 3, 4, 1);
const dailyTime2: DailyTime = new DailyTime('2013-08-03', 0, 1, 2, 1, 4, 1);
const dailyTime3: DailyTime = new DailyTime('2012-08-02', 0, 1, 2, -5, 4, 1);
const dailyTime4: DailyTime = new DailyTime('2012-08-01', 0, 1, 2, 8, 4, 1);
const dailyTimes: DailyTime[] = [dailyTime1, dailyTime2, dailyTime3, dailyTime4];
instance.dailyTimes = dailyTimes;

describe('DailySerie', () => {
	it('should be defined', () => {
		expect(DailySerie).toBeDefined();
	});

	it('should create an instance of the class', () => {
		expect(instance instanceof DailySerie).toBeTruthy();
	});

	it('should init the attributes', () => {
		expect(instance.symbol).toEqual('Symbol 1');
		expect(instance.lastMovement).toEqual(1);
		expect(instance.priceChange).toEqual([3, 1, -5, 8]);
		expect(instance.trend).toEqual(4);
	});

	it('should expose the public methods', () => {
		expect(typeof instance.buildDailyTimes).toEqual('function');
		expect(typeof instance.calculateTrend).toEqual('function');
		expect(typeof instance.getStartingDailyTime).toEqual('function');
		expect(typeof instance.getLastDailyTime).toEqual('function');
		expect(typeof instance.getLastHigherCloseDailyTime).toEqual('function');
		expect(typeof instance.getLastLowerCloseDailyTime).toEqual('function');
		expect(typeof instance.getHighestCloseDailyTime).toEqual('function');
		expect(typeof instance.getLowestCloseDailyTime).toEqual('function');
		expect(typeof instance.getMaxNumberOfNegativeDailyTimes).toEqual('function');
		expect(typeof instance.getMaxNumberOfPositiveDailyTimes).toEqual('function');
		expect(typeof instance.getMinNumberOfNegativeDailyTimes).toEqual('function');
		expect(typeof instance.getMinNumberOfPositiveDailyTimes).toEqual('function');
		expect(typeof instance.getNumberOfPositiveDailyTimes).toEqual('function');
		expect(typeof instance.getNumberOfNegativeDailyTimes).toEqual('function');
		expect(typeof instance.getYearMonthTrend).toEqual('function');
	});

	describe('buildDailyTimes', () => {
		it('should create the daily times', () => {
			instance.buildDailyTimes(prices);
			expect(instance.dailyTimes).toEqual(dailyTimes);
		});
	});

	describe('calculateTrend', () => {
		it('should throw the error for negative numbers', () => {
			expect(instance.calculateTrend.bind(instance, -1)).toThrowError('You cannot calculate a trend over a negative period');
		});

		it('should return 0', () => {
			expect(instance.calculateTrend(0)).toEqual(0);
		});

		it('should return the trend of 1 period', () => {
			expect(instance.calculateTrend(1)).toEqual(3);
		});

		it('should return the trend of 2 period', () => {
			expect(instance.calculateTrend(2)).toEqual(4);
		});

		it('should return the trend of 4 period', () => {
			expect(instance.calculateTrend(4)).toEqual(7);
		});

		it('should return the trend of all the serie if the period exceeds the length', () => {
			expect(instance.calculateTrend(99999999)).toEqual(7);
		});
	});

	describe('getStartingDailyTime', () => {
		expect(instance.getStartingDailyTime()).toEqual(dailyTime4);
	});

	describe('getLastDailyTime', () => {
		expect(instance.getLastDailyTime()).toEqual(dailyTime1);
	});

	describe('getLastHigherCloseDailyTime', () => {
		expect(instance.getLastHigherCloseDailyTime()).toEqual(dailyTime4);
	});

	describe('getLastLowerCloseDailyTime', () => {
		expect(instance.getLastLowerCloseDailyTime()).toEqual(dailyTime2);
	});

	describe('getHighestCloseDailyTime', () => {
		expect(instance.getHighestCloseDailyTime()).toEqual(dailyTime4);
	});

	describe('getLowestCloseDailyTime', () => {
		expect(instance.getLowestCloseDailyTime()).toEqual(dailyTime3);
	});

	describe('getMaxNumberOfNegativeDailyTimes', () => {
		it('should return 1', () => {
			expect(instance.getMaxNumberOfNegativeDailyTimes()).toEqual(1);
		});
	});

	describe('getMaxNumberOfPositiveDailyTimes', () => {
		it('should return 2', () => {
			expect(instance.getMaxNumberOfPositiveDailyTimes()).toEqual(2);
		});
	});

	describe('getMinNumberOfNegativeDailyTimes', () => {
		it('should return 1', () => {
			expect(instance.getMinNumberOfNegativeDailyTimes()).toEqual(1);
		});
	});

	describe('getMinNumberOfPositiveDailyTimes', () => {
		it('should return 1', () => {
			expect(instance.getMinNumberOfPositiveDailyTimes()).toEqual(1);
		});
	});

	describe('getNumberOfPositiveDailyTimes', () => {
		it('should return 3', () => {
			expect(instance.getNumberOfPositiveDailyTimes()).toEqual(3);
		});
	});

	describe('getNumberOfNegativeDailyTimes', () => {
		it('should return 1', () => {
			expect(instance.getNumberOfNegativeDailyTimes()).toEqual(1);
		});
	});

	describe('getYearMonthTrend', () => {
		it('should return the trend of August 2013', () => {
			expect(instance.getYearMonthTrend(2013, 7)).toEqual(200);
		});

		it('should return the trend of August 2012', () => {
			expect(instance.getYearMonthTrend(2012, 7)).toEqual(-162.5);
		});
	});
});
