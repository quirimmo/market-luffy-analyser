import { combineReducers } from 'redux';
import companies from './reducers/companies.reducer';
import dailySeries from './reducers/daily-series.reducer';
import companyName from './reducers/filter-company-name.reducer';
import companySectors from './reducers/filter-company-sector.reducer';

const reducers = combineReducers({ companies, dailySeries, companyName, companySectors });

export default reducers;
