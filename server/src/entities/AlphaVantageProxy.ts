import HTTPRequester from './HTTPRequester';
import { Observable, OperatorFunction } from 'rxjs';
import { pluck, map } from 'rxjs/operators';
import DailyTimeSeries from './DailyTimeSeries';

// free volume of calls: 5 requests per minute

const BASE_URL: string = 'https://www.alphavantage.co/query';
const DAILY_PRICES_FUNCTION: string = 'TIME_SERIES_DAILY';
const API_KEY: string = 'X71A1MTU6F1C1B4G';
const DAILY_TIME_SERIES_KEY = 'Time Series (Daily)';
export default class AlphaVantageProxy {
  public httpRequester: HTTPRequester;
  constructor() {
    this.httpRequester = new HTTPRequester();
  }

  getDailyPricesBySymbol(symbol: string, size: string = 'compact'): Observable<DailyTimeSeries> {
    const REQUEST_URL: string = this.getRequestURL(DAILY_PRICES_FUNCTION, symbol, size);
    return this.httpRequester
      .get(REQUEST_URL)
      .pipe(this.pluckResponseData(DAILY_TIME_SERIES_KEY))
      .pipe(map(onMap));

    function onMap(data: any) {
      return DailyTimeSeries.buildFromData(symbol, data);
    }
  }

  getDailyPricesBySymbols(symbols: string[], size: string = 'compact'): Observable<DailyTimeSeries[]> {
    const REQUEST_URLS: string[] = symbols.map(symbol => this.getRequestURL(DAILY_PRICES_FUNCTION, symbol, size));

    return this.httpRequester.getAll(REQUEST_URLS).pipe(map(onMap));

    function onMap(el: any) {
      return el.map((item: any, index: number) => DailyTimeSeries.buildFromData(symbols[index], item.data[DAILY_TIME_SERIES_KEY]));
    }
  }

  getRequestURL(alphavantageMethod: string, symbol: string, size: string = 'compact'): string {
    return `${BASE_URL}?function=${alphavantageMethod}&symbol=${symbol}&apikey=${API_KEY}&outputsize=${size}`;
  }

  pluckResponseData(valuesKey: string): OperatorFunction<{}, {}> {
    return pluck('data', valuesKey);
  }
}
