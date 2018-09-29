import { Router, Request, Response } from 'express';
import { Company } from '../models/company/Company';
import CompaniesProcessor from '../models/company/CompaniesProcessor';
import { DEFAULT_SECTORS } from '../utils/default-sectors';
import { sendSuccessfulResponse } from '../utils/response-utils';

// define the route
const router: Router = Router();
router.get('/', onGetCompanies);

export function onGetCompanies(req: Request, res: Response) {
  // get the sectors in the query params
  const sectors: string[] = req.query.sectors || [];
  // get all the companies
  let companies: Company[] = CompaniesProcessor.getAllCompanies();
  // if sectors have been passed through the request
  if (sectors.length) {
    // transform the given sectors into uppercase
    const uppercaseSectors: string[] = sectors.map((el: string) => DEFAULT_SECTORS[el.toUpperCase()]);
    // filter the companies which have the provided sectors
    companies = companies.filter(filterBySector.bind(null, uppercaseSectors));
  }
  // send the response
  sendSuccessfulResponse(res, companies);
}

export function filterBySector(sectors: string[], company: any): boolean {
  return sectors.indexOf(company.sector) > -1;
}

export const CompaniesController: Router = router;
