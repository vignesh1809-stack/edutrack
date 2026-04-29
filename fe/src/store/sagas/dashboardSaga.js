import { takeLatest, put, call, select } from 'redux-saga/effects';
import * as types from '../types/dashboardTypes';
import * as actions from '../actions/dashboardActions';

// API selector for access token
const getAccessToken = (state) => state.auth.accessToken;

const fetchDashboardApi = async (token) => {
    const response = await fetch('/api/principal/dashboard', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch dashboard data');
    }

    return await response.json();
};

function* handleFetchDashboard() {
    try {
        const token = yield select(getAccessToken);
        if (!token) {
            throw new Error('No authentication token found');
        }
        const data = yield call(fetchDashboardApi, token);
        yield put(actions.fetchPrincipalDashboardSuccess(data));
    } catch (error) {
        yield put(actions.fetchPrincipalDashboardFailure(error.message));
    }
}

export default function* dashboardSaga() {
    yield takeLatest(types.FETCH_PRINCIPAL_DASHBOARD_REQUEST, handleFetchDashboard);
}
