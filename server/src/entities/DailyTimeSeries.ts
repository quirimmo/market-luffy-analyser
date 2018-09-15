import DailyTime from './DailyTime';

export default class DailyTimeSeries {
  constructor(public symbol: string = '', public dailyTimes: DailyTime[] = []) {}

  getLastMovement(isPercentage: boolean = true): number {
    const priceChange = this.getPriceChangeByPeriod(isPercentage);
    let lastMovement = 0;
    let found = false;
    for (let i = 0; i < priceChange.length; i++) {
      if (!found) {
        isSameSign(priceChange[i], priceChange[i - 1]) || i === 0 ? (lastMovement += priceChange[i]) : (found = true);
      }
    }
    return lastMovement;

    function isSameSign(firstValue: number, secondValue: number): boolean {
      return Math.sign(firstValue) === Math.sign(secondValue);
    }
  }

  getPriceChangeByPeriod(isPercentage: boolean = true, period: number = this.dailyTimes.length): number[] {
    return this.dailyTimes.reduce(onReduce, []);

    function onReduce(acc: number[], val: DailyTime, ind: number, arr: DailyTime[]): number[] {
      if (ind < period - 1) {
        let diff: number = parseFloat((val.close - arr[ind + 1].close).toFixed(val.decimalsPrecision));
        if (isPercentage) {
          // const previousClose: number = ind > 0 ? arr[ind - 1] ;
          diff = parseFloat(((diff / Math.abs(arr[ind + 1].close)) * 100).toFixed(val.decimalsPrecision));
        }
        acc.push(diff);
      }
      return acc;
    }
  }

  getTrendByPeriod(isPercentage: boolean = true, period: number = this.dailyTimes.length): number {
    const priceChange = this.getPriceChangeByPeriod(isPercentage, period);
    return priceChange.reduce((acc: number, val: number) => acc + val, 0);
  }

  static buildFromData(symbol: string, data: any): DailyTimeSeries {
    if (!data) {
      return new DailyTimeSeries(symbol);
    }
    const keys: Array<string> = Object.keys(data);
    const values: DailyTime[] = keys.map(key => new DailyTime(key, data[key]));
    return new DailyTimeSeries(symbol, values);
  }
}
