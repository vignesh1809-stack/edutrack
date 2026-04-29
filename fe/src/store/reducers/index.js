import { combineReducers } from 'redux';
import institutionReducer from './institutionReducer';
import authReducer from './authReducer';
import dashboardReducer from './dashboardReducer';

const rootReducer = combineReducers({
  institutions: institutionReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
