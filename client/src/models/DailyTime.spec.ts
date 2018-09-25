import * as moment from 'moment';
import DailyTime from "./DailyTime";

const dailyTime: DailyTime = new DailyTime('2018-10-28', 0, 1, 2, 3, 4, 5);

describe('DailyTime', () => {
	it('should be defined', () => {
		expect(DailyTime).toBeDefined();
	});

	it('should be an instance of the class', () => {
		expect(dailyTime instanceof DailyTime).toBeTruthy();
	});

	it('should init the attributes', () => {
		expect(dailyTime.time).toEqual(moment('2018-10-28'));
		expect(dailyTime.open).toEqual(0);
		expect(dailyTime.high).toEqual(1);
		expect(dailyTime.low).toEqual(2);
		expect(dailyTime.close).toEqual(3);
		expect(dailyTime.volume).toEqual(4);
		expect(dailyTime.decimalsPrecision).toEqual(5);
	});
});