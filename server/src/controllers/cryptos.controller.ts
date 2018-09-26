import { Router, Request, Response } from 'express';
import { sendSuccessfulResponse, getCryptos, getRequestParameters, RequestParameters } from './utils.controller';
import { Observable } from 'rxjs';
import DailyTimeSeries from '../entities/DailyTimeSeries';

const router: Router = Router();
router.get('/:symbols/:size?/', onGetCryptos);

export function onGetCryptos(req: Request, res: Response) {
  req.params.symbols = req.params.symbols || '';
  const { isPercentage, symbols, size }: RequestParameters = getRequestParameters(req);

  const results: Observable<DailyTimeSeries[]> = getCryptos(symbols);
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

export const CryptosController: Router = router;
