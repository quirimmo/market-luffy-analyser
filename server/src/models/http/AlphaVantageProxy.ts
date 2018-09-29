import HTTPRequester from './HTTPRequester';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import DailyTimeSeries from './../daily-time/DailyTimeSeries';
import { findErrorInResponses } from '../../utils/response-utils';

// free volume of calls: 5 requests per minute

const BASE_URL: string = 'https://www.alphavantage.co/query';
const DAILY_PRICES_FUNCTION: string = 'TIME_SERIES_DAILY';
const CRYPTOS_DAILY_PRICES_FUNCTION: string = 'DIGITAL_CURRENCY_DAILY';
const API_KEY: string = 'X71A1MTU6F1C1B4G';
const DAILY_TIME_SERIES_KEY = 'Time Series (Daily)';
const CRYPTO_DAILY_TIME_SERIES_KEY = 'Time Series (Digital Currency Daily)';
const CRYPTOS_MARKET = 'USD';

export default class AlphaVantageProxy {
  public httpRequester: HTTPRequester;
  constructor() {
    this.httpRequester = new HTTPRequester();
  }

  getDailyPricesBySymbols(symbols: string[], size: string = 'compact'): Observable<DailyTimeSeries[]> {
    const REQUEST_URLS: string[] = symbols.map(symbol => this.getRequestURL(DAILY_PRICES_FUNCTION, symbol, size));
    return this.httpRequester.getAll(REQUEST_URLS).pipe(map(onMap));

    function onMap(el: any) {
      return el.map((item: any, index: number) => DailyTimeSeries.buildFromData(symbols[index], item.data[DAILY_TIME_SERIES_KEY]));
    }
  }

  getCryptoDailyPricesBySymbols(symbols: string[]): Observable<DailyTimeSeries[]> {
    const REQUEST_URLS: string[] = symbols.map(symbol => this.getCryptoRequestURL(CRYPTOS_DAILY_PRICES_FUNCTION, symbol));
    return this.httpRequester.getAll(REQUEST_URLS).pipe(map(onMap));

    function onMap(el: any, index: number) {
      // if the output stream has an error
      const error = findErrorInResponses(el);
      if (typeof error !== 'undefined') {
        throw new Error(`Error with the following request: ${REQUEST_URLS[index]}. ${error}`);
      }
      return el.map((item: any, index: number) =>
        DailyTimeSeries.buildFromData(symbols[index], item.data[CRYPTO_DAILY_TIME_SERIES_KEY], true)
      );
    }
  }

  getRequestURL(alphavantageMethod: string, symbol: string, size: string = 'compact'): string {
    return `${BASE_URL}?function=${alphavantageMethod}&symbol=${symbol}&apikey=${API_KEY}&outputsize=${size}`;
  }

  getCryptoRequestURL(alphavantageMethod: string, symbol: string): string {
    return `${BASE_URL}?function=${alphavantageMethod}&symbol=${symbol}&apikey=${API_KEY}&market=${CRYPTOS_MARKET}`;
  }
}
