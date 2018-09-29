import { AbstractDailyTime } from './AbstractDailyTime';
import CryptoDailyTime from './CryptoDailyTime';

const instance = new CryptoDailyTime('2018-09-01', {
  '1a. open (USD)': '10.00',
  '2a. high (USD)': '20.00',
  '3a. low (USD)': '30.00',
  '4a. close (USD)': '40.00',
  '5. volume': '50.00',
  '6. market cap (USD)': '60.00'
});

describe('Crypto Daily Time', () => {
  it('should be defined', () => {
    expect(CryptoDailyTime).toBeDefined();
  });

  it('should be an instance of the class', () => {
    expect(instance instanceof CryptoDailyTime).toBeTruthy();
  });

  it('should be an instance of the parent class', () => {
    expect(instance instanceof AbstractDailyTime).toBeTruthy();
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
    expect(instance.marketCap).toEqual(60);
  });
});
