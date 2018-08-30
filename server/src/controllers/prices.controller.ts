import { Router, Request, Response } from 'express';
import { Observable } from 'rxjs';
import DailyTimeSeries from '../entities/DailyTimeSeries';
import { getRequestParameters, RequestParameters, getPrices } from './utils.controller';

const router: Router = Router();

router.get('/:symbols?/:numberOfValues?', onGetPrices);

export function onGetPrices(req: Request, res: Response) {
  req.params.symbols = req.params.symbols || '';
  const { isPercentage, numberOfValues, symbols }: RequestParameters = getRequestParameters(req);

  const results: Observable<any> = getPrices(symbols, numberOfValues);
  results.subscribe(onSubscribe);

  function onSubscribe(resp: DailyTimeSeries[]): void {
    let ret: any = {
      data: {}
    };
    resp.forEach((serie: DailyTimeSeries) => {
      if (serie.dailyTimes.length) {
        ret.data[serie.symbol] = serie.dailyTimes;
      }
    });
    res.status(200).send(ret);
  }
}

export const PricesController: Router = router;
