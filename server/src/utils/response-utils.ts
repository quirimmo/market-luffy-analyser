import { Response } from 'express';
import DailyTimeSeries from '../models/daily-time/DailyTimeSeries';

export function sendSuccessfulResponse(response: Response, data: any) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.status(200);
  response.send(data);
}

export function buildDailySerieResponse(serie: DailyTimeSeries) {
  // if there are prices for the current symbol
  if (serie.dailyTimes.length) {
    // assign to the symbol the last movement, the price change, the trend and the prices
    return {
      [serie.symbol]: {
        lastMovement: serie.getLastMovement(),
        priceChange: serie.getPriceChangeByPeriod(),
        trend: serie.getTrendByPeriod(),
        prices: serie.dailyTimes
      }
    };
  }
  return undefined;
}
