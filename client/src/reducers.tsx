import { combineReducers } from 'redux';
import companies from './reducers/companies.reducer';
import dailySeries from './reducers/daily-series.reducer';
import companyName from './reducers/filter-company-name.reducer';

const reducers = combineReducers({ companies, dailySeries, companyName });

export default reducers;
