import { Router, Request, Response } from 'express';
import { Crypto } from '../entities/Crypto';
import { sendSuccessfulResponse } from '../utils/response-utils';
import CryptosProcessor from '../entities/CryptosProcessor';
// define the route
const router: Router = Router();
router.get('/', onGetCryptos);

export function onGetCryptos(req: Request, res: Response) {
  // get all the cryptos
	const allCryptos: Crypto[] = CryptosProcessor.getAllCryptos();
	// send the response
  sendSuccessfulResponse(res, allCryptos);
}

export const CryptosController: Router = router;
