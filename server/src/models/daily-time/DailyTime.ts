import { AbstractDailyTime } from './AbstractDailyTime';

export interface ITimeDailySeriesParams {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}

export default class DailyTime extends AbstractDailyTime {
  constructor(time: string, data: ITimeDailySeriesParams) {
    super(time, data);
    this.decimalsPrecision = data['1. open'].split('.')[1].length || 0;
    this.open = parseFloat(data['1. open']);
    this.high = parseFloat(data['2. high']);
    this.low = parseFloat(data['3. low']);
    this.close = parseFloat(data['4. close']);
  }
}
