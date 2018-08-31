import { Router, Request, Response } from 'express';
import { Company } from '../entities/Company';
import CompaniesProcessor from '../entities/CompaniesProcessor';
import { sendSuccessfulResponse } from './utils.controller';

const router: Router = Router();
router.get('/:symbols?', onGetCompanies);

export function onGetCompanies(req: Request, res: Response) {
  const sectors: string[] = req.query.sectors || [];
  const symbols: string[] = req.params.symbols ? req.params.symbols.split(',') : [];

  let companies: Company[] = CompaniesProcessor.getAllCompanies();

  if (symbols.length) {
    const uppercaseSymbols: string[] = symbols.map((el: string) => el.toUpperCase());
    companies = companies.filter(filterBySymbol.bind(null, uppercaseSymbols));
  } else if (sectors.length) {
    const uppercaseSectors: string[] = sectors.map((el: string) => getSector(el.toUpperCase()));
    companies = companies.filter(filterBySector.bind(null, uppercaseSectors));
  }

  sendSuccessfulResponse(res, companies);
}

export function filterBySymbol(symbols: string[], company: any): boolean {
  return symbols.indexOf(company.symbol.toUpperCase()) > -1;
}

export function filterBySector(sectors: string[], company: any): boolean {
  return sectors.indexOf(company.sector) > -1;
}

export const CompaniesController: Router = router;

export const enum Sectors {
  BASIC = 'Basic Industries',
  CAPITAL = 'Capital Goods',
  NON_DURABLES = 'Consumer Non-Durables',
  SERVICES = 'Consumer Services',
  ENERGY = 'Energy',
  FINANCE = 'Finance',
  HEALTH = 'Health Care',
  MISCELLANEOUS = 'Miscellaneous',
  PUBLIC = 'Public Utilities',
  TECHNOLOGY = 'Technology',
  TRANSPORTATION = 'Transportation'
}

export function getSector(sector: string): string {
  switch (sector) {
    case 'BASIC':
      return Sectors.BASIC;
    case 'CAPITAL':
      return Sectors.CAPITAL;
    case 'NON_DURABLES':
      return Sectors.NON_DURABLES;
    case 'SERVICES':
      return Sectors.SERVICES;
    case 'ENERGY':
      return Sectors.ENERGY;
    case 'FINANCE':
      return Sectors.FINANCE;
    case 'HEALTH':
      return Sectors.HEALTH;
    case 'MISCELLANEOUS':
      return Sectors.MISCELLANEOUS;
    case 'PUBLIC':
      return Sectors.PUBLIC;
    case 'TECHNOLOGY':
      return Sectors.TECHNOLOGY;
    case 'TRANSPORTATION':
      return Sectors.TRANSPORTATION;
    default:
      return '';
  }
}
