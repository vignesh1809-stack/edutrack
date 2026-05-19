import { call, put, takeLatest } from 'redux-saga/effects';
import axiosInstance from '../../api/axiosInstance';
import * as types from '../types/transportTypes';
import * as actions from '../actions/transportActions';

function* fetchDashboardSummarySaga() {
  try {
    const response = yield call(axiosInstance.get, '/api/transport/dashboard/summary');
    yield put(actions.fetchTransportDashboardSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchTransportDashboardFailure(error.response?.data?.message || error.message));
  }
}

function* fetchOnDutyStaffSaga() {
  try {
    const response = yield call(axiosInstance.get, '/api/transport/dashboard/on-duty-staff');
    yield put(actions.fetchTransportOnDutySuccess(response.data));
  } catch (error) {
    yield put(actions.fetchTransportOnDutyFailure(error.response?.data?.message || error.message));
  }
}

function* fetchStaffSaga() {
  try {
    const response = yield call(axiosInstance.get, '/api/transport/staff');
    yield put(actions.fetchTransportStaffSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchTransportStaffFailure(error.response?.data?.message || error.message));
  }
}

function* toggleStaffStatusSaga(action) {
  try {
    yield call(axiosInstance.put, `/api/transport/staff/${action.payload}/status`);
    yield put(actions.toggleStaffStatusSuccess(action.payload));
  } catch (error) {
    yield put(actions.toggleStaffStatusFailure(error.response?.data?.message || error.message));
  }
}

function* fetchRoutesSaga() {
  try {
    const response = yield call(axiosInstance.get, '/api/transport/routes');
    yield put(actions.fetchTransportRoutesSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchTransportRoutesFailure(error.response?.data?.message || error.message));
  }
}

export default function* transportSaga() {
  yield takeLatest(types.FETCH_TRANSPORT_DASHBOARD_REQUEST, fetchDashboardSummarySaga);
  yield takeLatest(types.FETCH_TRANSPORT_ON_DUTY_REQUEST, fetchOnDutyStaffSaga);
  yield takeLatest(types.FETCH_TRANSPORT_STAFF_REQUEST, fetchStaffSaga);
  yield takeLatest(types.TOGGLE_STAFF_STATUS_REQUEST, toggleStaffStatusSaga);
  yield takeLatest(types.FETCH_TRANSPORT_ROUTES_REQUEST, fetchRoutesSaga);
}
