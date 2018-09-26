import moment from 'moment';
import { AbstractDailyTime } from './AbstractDailyTime';

class MockAbstractDailyTime extends AbstractDailyTime {}
const instance = new MockAbstractDailyTime('1986-10-28', { '5. volume': '1000.00' });

describe('AbstractDailyTime', () => {
  it('should be defined', () => {
    expect(AbstractDailyTime).toBeDefined();
  });

  it('should create an instance', () => {
    expect(instance).toBeDefined();
    expect(instance instanceof AbstractDailyTime).toBeTruthy();
  });

  it('should init the attributes', () => {
    expect(instance.volume).toEqual(1000.00);
    expect(instance.time).toEqual(moment('1986-10-28'));
    expect(instance.open).toEqual(0);
    expect(instance.high).toEqual(0);
    expect(instance.low).toEqual(0);
    expect(instance.close).toEqual(0);
    expect(instance.decimalsPrecision).toEqual(0);
  });
});
