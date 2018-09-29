import LuffyRequestParser from './LuffyRequestParser';

const instance: LuffyRequestParser = new LuffyRequestParser();

jest.mock('./../company/CompaniesProcessor', () => {
  return {
    getAllCompanies: () => [
      {
        name: 'Company 1',
        symbol: 'CM1',
        sector: 'Sector A'
      },
      {
        name: 'Company 2',
        symbol: 'CM2',
        sector: 'Sector A'
      },
      {
        name: 'Company 3',
        symbol: 'CM3',
        sector: 'Sector B'
      },
      {
        name: 'Company 4',
        symbol: 'CM4',
        sector: 'Sector A'
      },
      {
        name: 'Company 5',
        symbol: 'CM5',
        sector: 'Sector B'
      }
    ]
  };
});

describe('LuffyRequestParser', () => {
  it('should be defined', () => {
    expect(LuffyRequestParser).toBeDefined();
  });

  it('should instantiate an instance of the class', () => {
    expect(instance instanceof LuffyRequestParser).toBeTruthy();
  });

  it('should defined the exposed methods', () => {
    expect(typeof instance.isRequestActionValid).toEqual('function');
    expect(typeof instance.parseGetAllDataBySectorsRequest).toEqual('function');
    expect(typeof instance.parseGetAllDataBySymbolsRequest).toEqual('function');
    expect(typeof instance.parseGetAllDataRequest).toEqual('function');
    expect(typeof instance.parseRequest).toEqual('function');
  });

  describe('isRequestActionValid', () => {
    it('should return false', () => {
      const input: any = {};
      expect(instance.isRequestActionValid(input)).toBeFalsy();
    });

    it('should return false', () => {
      const input: any = { action: undefined };
      expect(instance.isRequestActionValid(input)).toBeFalsy();
    });

    it('should return false', () => {
      const input: any = { action: {} };
      expect(instance.isRequestActionValid(input)).toBeFalsy();
    });

    it('should return true', () => {
      const input: any = { action: '' };
      expect(instance.isRequestActionValid(input)).toBeTruthy();
    });
  });

  describe('parseGetAllDataBySectorsRequest', () => {
    it('should return the symbols of the companies filtered by sector', () => {
      expect(instance.parseGetAllDataBySectorsRequest(['Sector A'])).toEqual(['CM1', 'CM2', 'CM4']);
    });
  });

  describe('parseGetAllDataBySymbolsRequest', () => {
    it('should return the symbols of the companies filtered by symbols', () => {
      expect(instance.parseGetAllDataBySymbolsRequest(['CM1', 'CM4'])).toEqual(['CM1', 'CM4']);
    });
  });

  describe('parseGetAllDataRequest', () => {
    it('should return the symbols of all the companies', () => {
      expect(instance.parseGetAllDataRequest()).toEqual(['CM1', 'CM2', 'CM3', 'CM4', 'CM5']);
    });
  });

  describe('parseRequest', () => {
    beforeEach(() => {
      spyOn(instance, 'parseGetAllDataRequest').and.callThrough();
      spyOn(instance, 'parseGetAllDataBySymbolsRequest').and.callThrough();
      spyOn(instance, 'parseGetAllDataBySectorsRequest').and.callThrough();
    });

    it('should call the parseGetAllDataRequest method', () => {
      instance.parseRequest({ action: 'getAllData' });
      expect(instance.parseGetAllDataRequest).toHaveBeenCalled();
    });

    it('should call the parseGetAllDataBySymbolsRequest method', () => {
      instance.parseRequest({ action: 'getAllDataBySymbols', symbols: ['SYMB1', 'SYMB2'] });
      expect(instance.parseGetAllDataBySymbolsRequest).toHaveBeenCalledWith(['SYMB1', 'SYMB2']);
    });

    it('should call the parseGetAllDataBySectorsRequest method', () => {
      instance.parseRequest({ action: 'getAllDataBySectors', sectors: ['SECT1', 'SECT2'] });
      expect(instance.parseGetAllDataBySectorsRequest).toHaveBeenCalledWith(['SECT1', 'SECT2']);
    });

    it('should throw the error', () => {
			expect(instance.parseRequest.bind(instance, { action: 'sadada' })).toThrow('No implementation for this action sadada');
		});
  });
});
