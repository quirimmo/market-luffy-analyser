import { Router, Request, Response } from 'express';
import { Observable } from 'rxjs';
import DailyTimeSeries from '../models/daily-time/DailyTimeSeries';
import AlphaVantageProxy from '../models/http/AlphaVantageProxy';
import { sendSuccessfulResponse, buildDailySerieResponse, sendErrorResponse } from '../utils/response-utils';
import { IRequestParameters } from '../utils/RequestParameters';
import { getRequestParameters } from '../utils/request-utils';

// define the route
const router: Router = Router();
router.get('/:symbols/', onGetCryptoPrices);

export const alphaVantageProxy: AlphaVantageProxy = new AlphaVantageProxy();

export function onGetCryptoPrices(req: Request, res: Response) {
  // get the parameters
  const { symbols }: IRequestParameters = getRequestParameters(req);
  // get cryptos by symbols
  const results: Observable<DailyTimeSeries[]> = alphaVantageProxy.getCryptoDailyPricesBySymbols(symbols);
  results.subscribe(onSubscribe, onError);

  function onSubscribe(resp: DailyTimeSeries[]): void {
    // build the response
    let ret: any = {};
    resp.forEach((serie: DailyTimeSeries) => {
      ret = { ...ret, ...buildDailySerieResponse(serie) };
    });
    sendSuccessfulResponse(res, ret);
  }

  function onError(err: any): void {
    sendErrorResponse(res, `Error retrieving the crypto daily prices: ${err}`);
  }
}

export const CryptoPricesController: Router = router;
