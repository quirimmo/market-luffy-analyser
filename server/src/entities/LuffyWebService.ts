import { Observable } from 'rxjs';
import WebService from './WebService';
import { StockPricesController } from '../controllers/stock-prices.controller';
import { CompaniesController } from '../controllers/companies.controller';
import { CryptoPricesController } from '../controllers/crypto-prices.controller';
import { CryptosController } from '../controllers/cryptos.controller';

const DEFAULT_PORT: number = 3000;

class LuffyWebService extends WebService {
  constructor(public port: number = DEFAULT_PORT) {
    super(port);
    this.addRoute('/stock-prices', StockPricesController)
      .addRoute('/companies', CompaniesController)
      .addRoute('/cryptos', CryptosController)
      .addRoute('/crypto-prices', CryptoPricesController);
  }

  start(): Observable<boolean> {
    return this.listen();
  }
}

export default LuffyWebService;
