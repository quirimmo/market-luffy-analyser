import { Observable } from 'rxjs';
import WebService from './WebService';
import { PricesController } from '../controllers/prices.controller';
import { MovementsController } from '../controllers/movements.controller';
import { TrendsController } from '../controllers/trends.controller';
import { CompaniesController } from '../controllers/companies.controller';
import { CryptosController } from '../controllers/cryptos.controller';

const DEFAULT_PORT: number = 3000;

class LuffyWebService extends WebService {
  constructor(public port: number = DEFAULT_PORT) {
    super(port);
    this.addRoute('/prices', PricesController)
      .addRoute('/movements', MovementsController)
      .addRoute('/trends', TrendsController)
      .addRoute('/companies', CompaniesController)
      .addRoute('/cryptos', CryptosController);
  }

  start(): Observable<boolean> {
    return this.listen();
  }
}

export default LuffyWebService;
