import { Router, Request, Response } from 'express';
import { Observable } from 'rxjs';
import DailyTimeSeries from '../entities/DailyTimeSeries';
import { getRequestParameters, RequestParameters, getPrices, sendSuccessfulResponse } from './utils.controller';

const router: Router = Router();

router.get('/:symbols/:size?/:isPercentage?', onGetTrends);

export function onGetTrends(req: Request, res: Response) {
  const { isPercentage, symbols, size }: RequestParameters = getRequestParameters(req);

  const results: Observable<any> = getPrices(symbols, size);
  results.subscribe(onSubscribe);

  function onSubscribe(resp: DailyTimeSeries[]): void {
    let ret: any = {
      data: {}
    };
    resp.forEach((serie: DailyTimeSeries) => {
      ret.data[serie.symbol] = serie.getTrendByPeriod(isPercentage);
    });
    sendSuccessfulResponse(res, ret);
  }
}

export const TrendsController: Router = router;
