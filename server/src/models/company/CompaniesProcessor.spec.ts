import CompaniesProcessor from './CompaniesProcessor';

jest.mock('fs', () => {
  return {
    writeFileSync: jest.fn(),
    readFileSync: jest.fn(() => {
      return '[{"Name": "A", "": ""}, {"Name": "B", "": ""}]';
    }),
    readdirSync: jest.fn(() => {
      return ['file1.json', 'file2.json', 'all-companies.json', 'file.ts', 'file.js'];
    })
  };
});

import { writeFileSync, readFileSync } from 'fs';
import { RawCompany } from './Company';

const instance: CompaniesProcessor = new CompaniesProcessor();

describe('CompaniesProcessor', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(CompaniesProcessor).toBeDefined();
  });

  it('should crete an instance', () => {
    expect(instance instanceof CompaniesProcessor).toBeTruthy();
  });

  it('should expose the public methods', () => {
    expect(typeof instance.createFinalCompaniesFile).toEqual('function');
    expect(typeof instance.process).toEqual('function');
    expect(typeof instance.processCompanyFile).toEqual('function');
    expect(typeof instance.readCompaniesFiles).toEqual('function');
  });

  it('should expose the static methods', () => {
    expect(typeof CompaniesProcessor.getAllCompanies).toEqual('function');
    expect(typeof CompaniesProcessor.getCompanyFromRawCompany).toEqual('function');
  });

  describe('getAllCompanies', () => {
    it('should return the list of companies from the raw companies', () => {
      expect(CompaniesProcessor.getAllCompanies()).toEqual([
        {
          symbol: undefined,
          name: 'A',
          lastSale: undefined,
          marketCap: undefined,
          sector: undefined,
          industry: undefined
        },
        {
          symbol: undefined,
          name: 'B',
          lastSale: undefined,
          marketCap: undefined,
          sector: undefined,
          industry: undefined
        }
      ]);
    });
  });

  describe('getCompanyFromRawCompany', () => {
    it('should convert the raw company to a company', () => {
      const rawCompany: RawCompany = {
        Symbol: 'symbol',
        Name: 'name',
        LastSale: 1,
        MarketCap: 2,
        'ADR TSO': '',
        IPOyear: 0,
        Sector: 'sector',
        Industry: 'industry',
        'Summary Quote': '',
        '': ''
      };
      expect(CompaniesProcessor.getCompanyFromRawCompany(rawCompany)).toEqual({
        symbol: 'symbol',
        name: 'name',
        lastSale: 1,
        marketCap: 2,
        sector: 'sector',
        industry: 'industry'
      });
    });
  });

  describe('createFinalCompaniesFile', () => {
    it('should call the writeFileSync of fs with the right parameters', () => {
      const content: string[] = ['ALL COMPANIES'];
      instance.createFinalCompaniesFile(content);
      expect(writeFileSync).toBeCalledWith('src/data/all-companies.json', JSON.stringify(content, null, 2));
    });

    it('should sort the list of companies given as input', () => {
      const content: any[] = [{ Name: 'Z' }, { Name: 'A' }];
      const sortedContent: any[] = [{ Name: 'A' }, { Name: 'Z' }];
      instance.createFinalCompaniesFile(content);
      expect(writeFileSync).toHaveBeenCalledWith('src/data/all-companies.json', JSON.stringify(sortedContent, null, 2));
    });
  });

  describe('process', () => {
    it('should call the readCompaniesFiles method', () => {
      const spyReadCompaniesFiles = spyOn(instance, 'readCompaniesFiles').and.returnValue([]);
      instance.process();
      expect(spyReadCompaniesFiles).toHaveBeenCalled();
    });

    it('should call the processCompanyFile method the expected number of times with the right parameters', () => {
      spyOn(instance, 'readCompaniesFiles').and.returnValue(['company1', 'company2']);
      const spyProcessCompanyFile = spyOn(instance, 'processCompanyFile');
      instance.process();
      expect(spyProcessCompanyFile).toHaveBeenCalledTimes(2);
    });

    it('should call the createFinalCompaniesFile method with the right parameters', () => {
      spyOn(instance, 'readCompaniesFiles').and.returnValue(['company1', 'company2']);
      spyOn(instance, 'processCompanyFile');
      const spyCreateFinalCompaniesFile = spyOn(instance, 'createFinalCompaniesFile');
      instance.process();
      expect(spyCreateFinalCompaniesFile).toHaveBeenCalledWith([]);
    });
  });

  describe('processCompanyFile', () => {
    it('should call the readFileSync method of fs with the right parameter', () => {
      const data: any = [];
      instance.processCompanyFile(data, 'file');
      expect(readFileSync).toHaveBeenCalledWith('src/data/file');
    });

    it('should remove the empty keys from the companies data', () => {
      const data: any = [];
      const content: any = [{ Name: 'A' }, { Name: 'B' }];
      instance.processCompanyFile(data, 'file');
      expect(writeFileSync).toHaveBeenCalledWith('src/data/file', JSON.stringify(content, null, 2));
    });

    it('should add the companies to the input data', () => {
      const data: any = [];
      const content: any = [
        { name: 'A', lastSale: undefined, industry: undefined, marketCap: undefined, sector: undefined, symbol: undefined },
        { name: 'B', lastSale: undefined, industry: undefined, marketCap: undefined, sector: undefined, symbol: undefined }
      ];
      instance.processCompanyFile(data, 'file');
      expect(data).toEqual([content]);
    });
  });

  describe('readCompaniesFiles', () => {
    it('should return the list of read files filtering the results', () => {
      expect(instance.readCompaniesFiles()).toEqual(['file1.json', 'file2.json']);
    });
  });
});
