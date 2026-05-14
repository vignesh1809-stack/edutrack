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

function* fetchStudentProfile() {
  try {
    const response = yield call(axiosInstance.get, '/api/student/dashboard/profile');
    yield put(actions.fetchStudentProfileSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.error?.message || error.message || 'Failed to fetch student profile';
    yield put(actions.fetchStudentProfileFailure(errorMessage));
  }
}

function* fetchStudentRemarks() {
  try {
    const response = yield call(axiosInstance.get, '/api/student/dashboard/remarks');
    yield put(actions.fetchStudentRemarksSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.error?.message || error.message || 'Failed to fetch student remarks';
    yield put(actions.fetchStudentRemarksFailure(errorMessage));
  }
}

function* fetchStaffList() {
  try {
    const response = yield call(axiosInstance.get, '/api/student/dashboard/staff');
    yield put(actions.fetchStaffListSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch staff list';
    yield put(actions.fetchStaffListFailure(errorMessage));
  }
}

function* submitRemark(action) {
  try {
    const { remarkData, callback } = action.payload;
    yield call(axiosInstance.post, '/api/student/dashboard/remarks', remarkData);
    yield put(actions.submitRemarkSuccess());
    if (callback) callback();
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to submit feedback';
    yield put(actions.submitRemarkFailure(errorMessage));
  }
}

export function* studentDashboardSaga() {
  yield takeLatest(types.FETCH_STUDENT_DASHBOARD_REQUEST, fetchStudentDashboard);
  yield takeLatest(types.FETCH_STUDENT_PROFILE_REQUEST, fetchStudentProfile);
  yield takeLatest(types.FETCH_STUDENT_REMARKS_REQUEST, fetchStudentRemarks);
  yield takeLatest(types.FETCH_STAFF_LIST_REQUEST, fetchStaffList);
  yield takeLatest(types.SUBMIT_REMARK_REQUEST, submitRemark);
}
