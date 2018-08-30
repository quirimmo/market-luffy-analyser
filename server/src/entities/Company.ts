export interface Company {
  symbol: string;
  name: string;
  lastSale: number;
  marketCap: number;
  sector: string;
  industry: string;
}

export interface RawCompany {
  Symbol: string;
  Name: string;
  LastSale: number;
  MarketCap: number;
  'ADR TSO': string;
  IPOyear: number;
  Sector: string;
  Industry: string;
  'Summary Quote': string;
  ''?: string;
}
