import { LuffySocketRequest } from './LuffySocketUtils';
import { readFileSync } from 'fs';
import { Company } from './Company';
import CompaniesProcessor from './CompaniesProcessor';

const ALL_COMPANIES_FILE: string = 'src/data/all-companies.json';

class LuffyRequestParser {
  constructor() {}

  isRequestActionValid(request: LuffySocketRequest): boolean {
    return typeof request.action === 'string';
  }

  parseRequest(data: LuffySocketRequest): string[] {
    switch (data.action) {
      case 'getAllData':
        return this.parseGetAllDataRequest();
      case 'getAllDataBySymbols':
        return this.parseGetAllDataBySymbolsRequest(data.symbols);
      case 'getAllDataBySectors':
        return this.parseGetAllDataBySectorsRequest(data.sectors);
      default:
        throw new Error(`No implementation for this action ${data.action}`);
    }
  }

  parseGetAllDataRequest(): string[] {
    const allCompanies: Company[] = CompaniesProcessor.getAllCompanies();
    return allCompanies.map((company: Company) => company.symbol);
  }

  parseGetAllDataBySymbolsRequest(symbols: string[] = []): string[] {
    symbols = symbols.map((symbol: string) => symbol.toUpperCase());
    const allCompanies: Company[] = CompaniesProcessor.getAllCompanies();
    return allCompanies
      .filter((company: Company) => symbols.indexOf(company.symbol.toUpperCase()) > -1)
      .map((company: Company) => company.symbol);
  }

  parseGetAllDataBySectorsRequest(sectors: string[] = []): string[] {
    sectors = sectors.map((sector: string) => sector.toUpperCase());
    const allCompanies: Company[] = CompaniesProcessor.getAllCompanies();
    return allCompanies
      .filter((company: Company) => sectors.indexOf(company.sector.toUpperCase()) > -1)
      .map((company: Company) => company.symbol);
  }
}

export default LuffyRequestParser;
