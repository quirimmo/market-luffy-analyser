import { Router, Request, Response } from 'express';
import { Observable } from 'rxjs';
import DailyTimeSeries from '../models/daily-time/DailyTimeSeries';
import { IRequestParameters } from '../utils/RequestParameters';
import AlphaVantageProxy from '../models/AlphaVantageProxy';
import { sendSuccessfulResponse, buildDailySerieResponse } from '../utils/response-utils';
import { getRequestParameters } from '../utils/request-utils';

// define the route
const router: Router = Router();
router.get('/:symbols?/:size?/', onGetStockPrices);

export function onGetStockPrices(req: Request, res: Response) {
  // get the parameters
  const { symbols, size }: IRequestParameters = getRequestParameters(req);
  // get all the prices
  const alphaVantageProxy: AlphaVantageProxy = new AlphaVantageProxy();
  const results: Observable<any> = alphaVantageProxy.getDailyPricesBySymbols(symbols, size);
  results.subscribe(onSubscribe);

  function onSubscribe(resp: DailyTimeSeries[]): void {
    // build the response
    let ret: any = {};
    resp.forEach((serie: DailyTimeSeries) => {
      ret = { ...ret, ...buildDailySerieResponse(serie) };
    });
    // send the response
    sendSuccessfulResponse(res, ret);
  }
}

export const StockPricesController: Router = router;
