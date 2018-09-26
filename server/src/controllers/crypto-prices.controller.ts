import { Router, Request, Response } from 'express';
import { Observable } from 'rxjs';
import DailyTimeSeries from '../entities/DailyTimeSeries';
import AlphaVantageProxy from '../entities/AlphaVantageProxy';
import { sendSuccessfulResponse, buildDailySerieResponse } from '../utils/response-utils';
import { IRequestParameters } from '../utils/RequestParameters';
import { getRequestParameters } from '../utils/request-utils';

// define the route
const router: Router = Router();
router.get('/:symbols?/', onGetCryptoPrices);

export function onGetCryptoPrices(req: Request, res: Response) {
  // get the parameters
  const { symbols }: IRequestParameters = getRequestParameters(req);
  // get cryptos by symbols
  const alphaVantageProxy: AlphaVantageProxy = new AlphaVantageProxy();
  const results: Observable<DailyTimeSeries[]> = alphaVantageProxy.getCryptoDailyPricesBySymbols(symbols);
  results.subscribe(onSubscribe);

  function onSubscribe(resp: DailyTimeSeries[]): void {
    // build the response
    let ret: any = {};
    resp.forEach((serie: DailyTimeSeries) => {
      ret = { ...ret, ...buildDailySerieResponse(serie) };
    });
    sendSuccessfulResponse(res, ret);
  }
}

export const CryptoPricesController: Router = router;
