import { combineReducers } from 'redux';
import companies from './reducers/companies.reducer';
import selectedCompany from './reducers/company.reducer';
import dailySeries from './reducers/daily-series.reducer';

const reducers = combineReducers({ companies, selectedCompany, dailySeries });

export default reducers;
