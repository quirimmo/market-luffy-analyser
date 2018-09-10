import { combineReducers } from 'redux';
import companies from './reducers/companies.reducer';
import dailySeries from './reducers/daily-series.reducer';
import companySectors from './reducers/filter-company-sector.reducer';

const reducers = combineReducers({ companies, dailySeries, companySectors });

export default reducers;
