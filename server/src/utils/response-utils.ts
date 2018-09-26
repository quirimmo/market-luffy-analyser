import { Response } from 'express';

export function sendSuccessfulResponse(response: Response, data: any) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.status(200).send(data);
}
