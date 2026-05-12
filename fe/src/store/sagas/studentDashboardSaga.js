import { call, put, takeLatest } from 'redux-saga/effects';
import axiosInstance from '../../api/axiosInstance';
import * as types from '../types/studentDashboardTypes';
import * as actions from '../actions/studentDashboardActions';

function* fetchStudentDashboard(action) {
  try {
    const { semester } = action.payload;
    let url = '/api/student/dashboard';
    if (semester) {
      url += `?semester=${semester}`;
    }
    
    const response = yield call(axiosInstance.get, url);
    yield put(actions.fetchStudentDashboardSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.error?.message || error.message || 'Failed to fetch student dashboard';
    yield put(actions.fetchStudentDashboardFailure(errorMessage));
  }
}

export function* studentDashboardSaga() {
  yield takeLatest(types.FETCH_STUDENT_DASHBOARD_REQUEST, fetchStudentDashboard);
}
