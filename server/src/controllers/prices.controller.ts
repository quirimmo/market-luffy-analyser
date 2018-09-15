import { Router, Request, Response } from 'express';
import { Observable } from 'rxjs';
import DailyTimeSeries from '../entities/DailyTimeSeries';
import { getRequestParameters, RequestParameters, getPrices, sendSuccessfulResponse } from './utils.controller';

const router: Router = Router();
router.get('/:symbols?/:size?/', onGetPrices);

export function onGetPrices(req: Request, res: Response) {
  req.params.symbols = req.params.symbols || '';
  const { isPercentage, symbols, size }: RequestParameters = getRequestParameters(req);

  const results: Observable<any> = getPrices(symbols, size);
  results.subscribe(onSubscribe);

  function onSubscribe(resp: DailyTimeSeries[]): void {
    let ret: any = {
      data: {}
    };
    resp.forEach((serie: DailyTimeSeries) => {
      if (serie.dailyTimes.length) {
        serie.getPriceChangeByPeriod;
        ret.data[serie.symbol] = {
          lastMovement: serie.getLastMovement(),
          priceChange: serie.getPriceChangeByPeriod(),
          trend: serie.getTrendByPeriod(),
          prices: serie.dailyTimes
        };
      }
    });
    sendSuccessfulResponse(res, ret);
  }
}

export const PricesController: Router = router;
