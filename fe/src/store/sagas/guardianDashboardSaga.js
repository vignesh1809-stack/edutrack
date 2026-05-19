import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../types/guardianDashboardTypes';
import * as actions from '../actions/guardianDashboardActions';
import axiosInstance from '../../api/axiosInstance';

function* handleFetchGuardianDashboard(action) {
    try {
        const { studentId, semester } = action.payload;
        let url = '/api/guardian/dashboard';
        const params = [];
        if (studentId) params.push(`studentId=${studentId}`);
        if (semester) params.push(`semester=${semester}`);
        
        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }

        const response = yield call(axiosInstance.get, url);
        yield put(actions.fetchGuardianDashboardSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchGuardianDashboardFailure(
            error.response?.data?.message || error.message || 'Failed to fetch guardian dashboard'
        ));
    }
}

export default function* guardianDashboardSaga() {
    yield takeLatest(types.FETCH_GUARDIAN_DASHBOARD_REQUEST, handleFetchGuardianDashboard);
}
