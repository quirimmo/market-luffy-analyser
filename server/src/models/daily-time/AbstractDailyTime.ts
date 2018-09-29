import moment from 'moment';

export interface IAbstractDailyTimeParams {
  '5. volume': string;
}

export abstract class AbstractDailyTime {
  public time: moment.Moment;
  public open: number;
  public high: number;
  public low: number;
  public close: number;
  public volume: number;
  public decimalsPrecision: number;

  constructor(time: string, data: IAbstractDailyTimeParams) {
		this.time = moment(time);
    this.volume = parseFloat(data['5. volume']);
    this.open = 0;
    this.high = 0;
    this.low = 0;
    this.close = 0;
    this.decimalsPrecision = 0;
  }
}
