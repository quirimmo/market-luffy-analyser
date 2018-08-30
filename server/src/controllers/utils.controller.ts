import { Request } from 'express';
import AlphaVantageProxy from '../entities/AlphaVantageProxy';
import { Observable } from 'rxjs';
import DailyTimeSeries from '../entities/DailyTimeSeries';
export interface RequestParameters {
  isPercentage: boolean;
  numberOfValues: number;
  symbols: string[];
}

export function getRequestParameters(req: Request): RequestParameters {
  const isPercentage = req.params.isPercentage || true;
  const numberOfValues = req.params.numberOfValues;
  const symbols = req.params.symbols.split(',');

  return {
    isPercentage,
    numberOfValues,
    symbols
  };
}

export function getPrices(symbols: string[], numberOfValues: number): Observable<any> {
  const alphaVantageProxy: AlphaVantageProxy = new AlphaVantageProxy();
  const results: Observable<DailyTimeSeries[]> = alphaVantageProxy.getDailyPricesBySymbols(symbols, numberOfValues);
  return results;
}
