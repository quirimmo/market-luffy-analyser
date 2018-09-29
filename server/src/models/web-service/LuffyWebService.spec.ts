import LuffyWebService from './LuffyWebService';
import { StockPricesController } from './../../controllers/stock-prices.controller';
import { CompaniesController } from './../../controllers/companies.controller';
import { CryptosController } from '../../controllers/cryptos.controller';
import { CryptoPricesController } from '../../controllers/crypto-prices.controller';

const instance: LuffyWebService = new LuffyWebService();

describe('LuffyWebService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(LuffyWebService).toBeDefined();
  });

  it('should instantiate an instace of the class', () => {
    expect(instance instanceof LuffyWebService).toBeTruthy();
  });

  it('should define the exposed methods', () => {
    expect(typeof instance.start).toEqual('function');
  });

  describe('constructor', () => {
    it('should add the routes', () => {
      spyOn(LuffyWebService.prototype, 'addRoute').and.callThrough();
      let newInstance: LuffyWebService = new LuffyWebService();
      expect(LuffyWebService.prototype.addRoute).toHaveBeenCalledTimes(4);
      expect(LuffyWebService.prototype.addRoute).toHaveBeenNthCalledWith(1, '/stock-prices', StockPricesController);
      expect(LuffyWebService.prototype.addRoute).toHaveBeenNthCalledWith(2, '/companies', CompaniesController);
      expect(LuffyWebService.prototype.addRoute).toHaveBeenNthCalledWith(3, '/cryptos', CryptosController);
      expect(LuffyWebService.prototype.addRoute).toHaveBeenNthCalledWith(4, '/crypto-prices', CryptoPricesController);
    });
  });

  describe('start', () => {
    it('should call the listen method', () => {
			spyOn(instance, 'listen');
			instance.start();
			expect(instance.listen).toHaveBeenCalled();
		});
  });
});
