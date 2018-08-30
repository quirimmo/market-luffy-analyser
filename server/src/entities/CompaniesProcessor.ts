import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { RawCompany, Company } from './Company';

const FOLDER_PATH: string = 'src/data/';
const COMPOSED_COMPANIES_FILE: string = 'all-companies.json';

class CompaniesProcessor {
  constructor() {}

  process(): void {
    const allFiles: string[] = this.readCompaniesFiles();
    const allCompanies: Company[] = [];
    allFiles.forEach(this.processCompanyFile.bind(this, allCompanies));
    this.createFinalCompaniesFile(allCompanies);
    console.log('Processed and written the final companies files');
  }

  readCompaniesFiles(): string[] {
    const allFiles: string[] = readdirSync(FOLDER_PATH);
    return allFiles.filter(onFilterCompaniesFiles);

    function onFilterCompaniesFiles(file: string) {
      return file.endsWith('.json') && file !== COMPOSED_COMPANIES_FILE;
    }
  }

  processCompanyFile(allCompanies: Array<Company[]>, file: string): void {
    const completeFilePath: string = FOLDER_PATH + file;
    const fileContent: string = readFileSync(completeFilePath).toString();
    const companies: RawCompany[] = JSON.parse(fileContent.toString());
    companies.forEach(removeNotUsedKeys);
    companies.sort((a: RawCompany, b: RawCompany) => b.MarketCap - a.MarketCap);
    writeFileSync(completeFilePath, JSON.stringify(companies, null, 2));
    const transformedCompanies: Company[] = companies.map(CompaniesProcessor.getCompanyFromRawCompany);
    console.log('Processed and writte the file:', completeFilePath);
    allCompanies.push(transformedCompanies);

    function removeNotUsedKeys(company: RawCompany) {
      Object.keys(company).forEach(onEachKey);

      function onEachKey(key: string) {
        if (key === '' || key === 'ADR TSO' || key === 'IPOyear' || key === 'Summary Quote') {
          delete company[key];
        }
      }
    }
  }

  createFinalCompaniesFile(allCompanies: any): void {
    const flattenArray: RawCompany[] = [].concat(...allCompanies);
    flattenArray.sort((a: RawCompany, b: RawCompany) => a.Name.localeCompare(b.Name));
    writeFileSync(FOLDER_PATH + COMPOSED_COMPANIES_FILE, JSON.stringify(flattenArray, null, 2));
  }

  static getAllCompanies(): Company[] {
    const allRawCompanies: RawCompany[] = JSON.parse(readFileSync(FOLDER_PATH + COMPOSED_COMPANIES_FILE).toString());
    const allCompanies: Company[] = allRawCompanies.map(CompaniesProcessor.getCompanyFromRawCompany);
    return allCompanies;
  }

  static getCompanyFromRawCompany(rawCompany: RawCompany): Company {
    return {
      symbol: rawCompany.Symbol,
      name: rawCompany.Name,
      lastSale: rawCompany.LastSale,
      marketCap: rawCompany.MarketCap,
      sector: rawCompany.Sector,
      industry: rawCompany.Industry
    };
  }
}

export default CompaniesProcessor;
