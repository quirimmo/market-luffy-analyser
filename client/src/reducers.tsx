import { combineReducers } from 'redux';
import companies from './reducers/companies.reducer';

const reducers = combineReducers({ companies });

export default reducers;
