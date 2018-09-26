import { AbstractDailyTime } from './AbstractDailyTime';

export interface ICryptoDailyTimeParams {
  '1a. open (USD)': string;
  '2a. high (USD)': string;
  '3a. low (USD)': string;
  '4a. close (USD)': string;
  '5. volume': string;
  '6. market cap (USD)': string;
}

export default class CryptoDailyTime extends AbstractDailyTime {
  public marketCap: number;

  constructor(time: string, data: ICryptoDailyTimeParams) {
    super(time, data);
    this.decimalsPrecision = data['1a. open (USD)'].split('.')[1].length || 0;
    this.open = parseFloat(data['1a. open (USD)']);
    this.high = parseFloat(data['2a. high (USD)']);
    this.low = parseFloat(data['3a. low (USD)']);
    this.close = parseFloat(data['4a. close (USD)']);
    this.marketCap = parseFloat(data['6. market cap (USD)']);
  }
}
