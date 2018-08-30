import LuffyWebService from './LuffyWebService';
import { PricesController } from '../controllers/prices.controller';
import { CompaniesController } from '../controllers/companies.controller';
import { TrendsController } from '../controllers/trends.controller';
import { MovementsController } from '../controllers/movements.controller';

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
      expect(LuffyWebService.prototype.addRoute).toHaveBeenNthCalledWith(1, '/prices', PricesController);
      expect(LuffyWebService.prototype.addRoute).toHaveBeenNthCalledWith(2, '/movements', MovementsController);
      expect(LuffyWebService.prototype.addRoute).toHaveBeenNthCalledWith(3, '/trends', TrendsController);
      expect(LuffyWebService.prototype.addRoute).toHaveBeenNthCalledWith(4, '/companies', CompaniesController);
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
