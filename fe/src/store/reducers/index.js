import { combineReducers } from 'redux';
import institutionReducer from './institutionReducer';
import authReducer from './authReducer';
import dashboardReducer from './dashboardReducer';
import studentReducer from './studentReducer';
import remarksReducer from './remarksReducer';

const rootReducer = combineReducers({
  institutions: institutionReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  students: studentReducer,
  remarks: remarksReducer,
});

export default rootReducer;
