import { Request, Response } from 'express';
import AlphaVantageProxy from '../entities/AlphaVantageProxy';
import { Observable } from 'rxjs';
import DailyTimeSeries from '../entities/DailyTimeSeries';
export interface RequestParameters {
  isPercentage: boolean;
  size: string;
  symbols: string[];
}

export function getRequestParameters(req: Request): RequestParameters {
  const isPercentage = req.params.isPercentage || true;
  const symbols = req.params.symbols.split(',');
  const size = req.params.size;

  return {
    isPercentage,
    symbols,
    size
  };
}

export function sendSuccessfulResponse(response: Response, data: any) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.status(200).send(data);
}

export function getPrices(symbols: string[], size: string = 'compact'): Observable<DailyTimeSeries[]> {
  const alphaVantageProxy: AlphaVantageProxy = new AlphaVantageProxy();
  return alphaVantageProxy.getDailyPricesBySymbols(symbols, size);
}

export function getCryptos(symbols: string[]): Observable<DailyTimeSeries[]> {
  const alphaVantageProxy: AlphaVantageProxy = new AlphaVantageProxy();
  return alphaVantageProxy.getCryptoDailyPricesBySymbols(symbols);
}
