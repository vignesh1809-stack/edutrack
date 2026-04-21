import { combineReducers } from 'redux';
import institutionReducer from './institutionReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  institutions: institutionReducer,
  auth: authReducer,
});

export default rootReducer;
