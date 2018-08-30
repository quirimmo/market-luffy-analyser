import DailyTime from './DailyTime';

const instance = new DailyTime('2018-09-01', {
  '1. open': '10.00',
  '2. high': '20.00',
  '3. low': '30.00',
  '4. close': '40.00',
  '5. volume': '50.00'
});

describe('Daily Time', () => {
	it('should be defined', () => {
		expect(DailyTime).toBeDefined();
	});

	it('should be an instance of the class', () => {
		expect(instance instanceof DailyTime).toBeTruthy();
	});

	it('should define the number of digits', () => {
		expect(instance.decimalsPrecision).toEqual(2);
	});

	it('should init the attributes', () => {
		expect(instance.open).toEqual(10);
		expect(instance.high).toEqual(20);
		expect(instance.low).toEqual(30);
		expect(instance.close).toEqual(40);
		expect(instance.volume).toEqual(50);
	});
});
