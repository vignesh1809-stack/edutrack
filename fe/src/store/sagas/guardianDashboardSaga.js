import { call, put, takeLatest } from 'redux-saga/effects';
import axiosInstance from '../../api/axiosInstance';
import * as types from '../types/guardianDashboardTypes';
import * as actions from '../actions/guardianDashboardActions';

function* fetchGuardianDashboard(action) {
    try {
        const { studentId, semester } = action.payload;
        let url = '/api/guardian/dashboard';
        const params = new URLSearchParams();
        if (studentId) params.append('studentId', studentId);
        if (semester) params.append('semester', semester);
        
        const queryString = params.toString();
        if (queryString) {
            url += `?${queryString}`;
        }
        
        const response = yield call(axiosInstance.get, url);
        yield put(actions.fetchGuardianDashboardSuccess(response.data));
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch guardian dashboard';
        yield put(actions.fetchGuardianDashboardFailure(errorMessage));
    }
}

function* fetchAttendance(action) {
    try {
        const { studentId, semester } = action.payload;
        let url = '/api/guardian/dashboard/attendance';
        const params = new URLSearchParams();
        if (studentId) params.append('studentId', studentId);
        if (semester) params.append('semester', semester);
        
        const response = yield call(axiosInstance.get, url + (params.toString() ? `?${params.toString()}` : ''));
        yield put(actions.fetchGuardianAttendanceSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchGuardianAttendanceFailure(error.message));
    }
}

function* fetchFees(action) {
    try {
        const { studentId } = action.payload;
        let url = '/api/guardian/dashboard/fees';
        if (studentId) url += `?studentId=${studentId}`;
        
        const response = yield call(axiosInstance.get, url);
        yield put(actions.fetchGuardianFeesSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchGuardianFeesFailure(error.message));
    }
}

export function* guardianDashboardSaga() {
    yield takeLatest(types.FETCH_GUARDIAN_DASHBOARD_REQUEST, fetchGuardianDashboard);
    yield takeLatest(types.FETCH_GUARDIAN_ATTENDANCE_REQUEST, fetchAttendance);
    yield takeLatest(types.FETCH_GUARDIAN_FEES_REQUEST, fetchFees);
}
