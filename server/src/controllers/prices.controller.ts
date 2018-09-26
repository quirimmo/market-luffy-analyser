import { Router, Request, Response } from 'express';
import { Observable } from 'rxjs';
import DailyTimeSeries from '../entities/DailyTimeSeries';
import { IRequestParameters } from '../utils/RequestParameters';
import AlphaVantageProxy from '../entities/AlphaVantageProxy';
import { sendSuccessfulResponse } from '../utils/response-utils';
import { getRequestParameters } from '../utils/request-utils';

// define the route
const router: Router = Router();
router.get('/:symbols?/:size?/', onGetPrices);

export function onGetPrices(req: Request, res: Response) {
  // get the parameters
  const { symbols, size }: IRequestParameters = getRequestParameters(req);
  // get all the prices
  const results: Observable<any> = getPrices(symbols, size);
  results.subscribe(onSubscribe);

  function onSubscribe(resp: DailyTimeSeries[]): void {
    // build the response
    let ret: any = {};
    resp.forEach((serie: DailyTimeSeries) => {
      buildPricesResponse(serie, ret);
    });
    // send the response
    sendSuccessfulResponse(res, ret);
  }
}

export function buildPricesResponse(serie: DailyTimeSeries, ret: any) {
  // if there are prices for the current symbol
  if (serie.dailyTimes.length) {
    // assign to the symbol the last movement, the price change, the trend and the prices
    ret[serie.symbol] = {
      lastMovement: serie.getLastMovement(),
      priceChange: serie.getPriceChangeByPeriod(),
      trend: serie.getTrendByPeriod(),
      prices: serie.dailyTimes
    };
  }
}

export function getPrices(symbols: string[], size: string = 'compact'): Observable<any> {
  const alphaVantageProxy: AlphaVantageProxy = new AlphaVantageProxy();
  const results: Observable<DailyTimeSeries[]> = alphaVantageProxy.getDailyPricesBySymbols(symbols, size);
  return results;
}

export const PricesController: Router = router;
