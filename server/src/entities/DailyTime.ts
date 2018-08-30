import moment from 'moment';

export interface TimeDailySeriesParams {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}

export default class DailyTime {
  public time: moment.Moment;
  public open: number;
  public high: number;
  public low: number;
  public close: number;
  public volume: number;
  public decimalsPrecision: number;

  constructor(time: string, data: TimeDailySeriesParams) {
    this.time = moment(time);
    this.decimalsPrecision = data['1. open'].split('.')[1].length || 0;
    this.open = parseFloat(data['1. open']);
    this.high = parseFloat(data['2. high']);
    this.low = parseFloat(data['3. low']);
    this.close = parseFloat(data['4. close']);
    this.volume = parseFloat(data['5. volume']);
  }
}
