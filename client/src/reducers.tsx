import { combineReducers } from 'redux';
import companies from './reducers/companies.reducer';
import dailySeries from './reducers/daily-series.reducer';

const reducers = combineReducers({ companies, dailySeries });

export default reducers;
