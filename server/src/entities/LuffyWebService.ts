import WebService from './WebService';
import { PricesController } from '../controllers/prices.controller';
import { MovementsController } from '../controllers/movements.controller';
import { TrendsController } from '../controllers/trends.controller';
import { CompaniesController } from '../controllers/companies.controller';
import { Observable } from '../../node_modules/rxjs';

const DEFAULT_PORT: number = 3000;

class LuffyWebService extends WebService {
  constructor(public port: number = DEFAULT_PORT) {
    super(port);
    this.addRoute('/prices', PricesController)
      .addRoute('/movements', MovementsController)
      .addRoute('/trends', TrendsController)
      .addRoute('/companies', CompaniesController);
  }

  start(): Observable<boolean> {
    return this.listen();
  }
}

export default LuffyWebService;
