import { Response } from 'express';
import DailyTimeSeries from '../models/daily-time/DailyTimeSeries';

export function sendSuccessfulResponse(response: Response, data: any) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.status(200);
  response.send(data);
}

export function sendErrorResponse(response: Response, errorMsg: string, statusCode: number = 400) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.status(statusCode);
  response.send({ error: errorMsg });
}

export function findErrorInResponses(responses: any) {
  const error = responses.find(findErrorInResponse);
  return error ? error.data['Error Message'] : undefined;
}

export function findErrorInResponse(response: any) {
  return response.data['Error Message'];
}

export function buildDailySerieResponse(serie: DailyTimeSeries) {
  // if there are prices for the current symbol
  if (serie.dailyTimes.length) {
    console.log(serie);
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
