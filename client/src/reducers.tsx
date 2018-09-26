import { combineReducers } from 'redux';
import companies from './reducers/companies.reducer';
import selectedCompany from './reducers/company.reducer';
import dailySeries from './reducers/daily-series.reducer';
import cryptos from './reducers/cryptos.reducer';
import selectedCrypto from './reducers/crypto.reducer';

const reducers = combineReducers({ companies, selectedCompany, dailySeries, cryptos, selectedCrypto });

export default reducers;
