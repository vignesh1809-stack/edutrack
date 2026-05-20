import { combineReducers } from 'redux';
import institutionReducer from './institutionReducer';
import authReducer from './authReducer';
import dashboardReducer from './dashboardReducer';
import studentReducer from './studentReducer';
import remarksReducer from './remarksReducer';
import studentDashboardReducer from './studentDashboardReducer';
import guardianDashboardReducer from './guardianDashboardReducer';
import transportReducer from './transportReducer';
import paperReducer from './paperReducer';

const rootReducer = combineReducers({
  institutions: institutionReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  students: studentReducer,
  remarks: remarksReducer,
  studentDashboard: studentDashboardReducer,
  guardianDashboard: guardianDashboardReducer,
  transport: transportReducer,
  papers: paperReducer,
});

export default rootReducer;
