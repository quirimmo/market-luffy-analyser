import { Router, Request, Response } from 'express';
import { Observable } from 'rxjs';
import DailyTimeSeries from '../entities/DailyTimeSeries';
import { getRequestParameters, RequestParameters, getPrices } from './utils.controller';

const router: Router = Router();

router.get('/:symbols/:isPercentage?/:numberOfValues?', onGetMovements);

export function onGetMovements(req: Request, res: Response): void {
  const { isPercentage, numberOfValues, symbols }: RequestParameters = getRequestParameters(req);

  const results: Observable<any> = getPrices(symbols, numberOfValues);
  results.subscribe(onSubscribe);

  function onSubscribe(resp: DailyTimeSeries[]): void {
    let ret: any = {
      data: {}
    };
    resp.forEach((serie: DailyTimeSeries) => {
      ret.data[serie.symbol] = serie.getLastMovement(isPercentage);
    });
    res.status(200).send(ret);
  }
}

export const MovementsController: Router = router;
