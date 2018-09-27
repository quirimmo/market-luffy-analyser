import { readFileSync } from 'fs';
import { Company } from '../company/Company';
import { Crypto } from './Crypto';

const FOLDER_PATH: string = 'src/data/';
const COMPOSED_CRYPTOS_FILE: string = 'all-cryptos.json';

class CryptosProcessor {
  constructor() {}

  static getAllCryptos(): Crypto[] {
    const allCryptos: Company[] = JSON.parse(readFileSync(FOLDER_PATH + COMPOSED_CRYPTOS_FILE).toString());
    return allCryptos;
  }
}

export default CryptosProcessor;
