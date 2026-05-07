import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../types/authTypes';
import * as actions from '../actions/authActions';
import axiosInstance from '../../api/axiosInstance';

// Helper for API calls
const loginApi = async (credentials) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            institutionId: credentials.institutionId,
            phone: credentials.phone,
            password: credentials.password,
            role: credentials.role,
        })
    });

    return await handleAuthResponse(response);
};

const refreshTokenApi = async (refreshToken) => {
    const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
    });

    return await handleAuthResponse(response);
};

const fetchProfileApi = async () => {
    const response = await axiosInstance.get('/api/profile');
    return response.data;
};

const handleAuthResponse = async (response) => {
    const contentType = response.headers.get("content-type");
    let data = null;

    if (contentType && contentType.indexOf("application/json") !== -1) {
        try {
            data = await response.json();
        } catch (e) {
            console.error("JSON parsing error:", e);
        }
    } else {
        const text = await response.text();
        if (text) data = { message: text };
    }

    if (!response.ok) {
        throw new Error(data?.message || `Auth action failed with status ${response.status}`);
    }

    if (!data) throw new Error("Empty response from server");
    return data;
};

function* handleLogin(action) {
    try {
        const data = yield call(loginApi, action.payload);

        // Persist session
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));

        yield put(actions.loginSuccess(data));
    } catch (error) {
        yield put(actions.loginFailure(error.message));
    }
}

function* handleRefreshToken(action) {
    try {
        const data = yield call(refreshTokenApi, action.payload);

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        yield put(actions.refreshTokenSuccess(data));
    } catch (error) {
        yield put(actions.refreshTokenFailure(error.message));
        // If refresh fails, log the user out
        yield put(actions.logout());
    }
}

function* handleFetchProfile() {
    try {
        const data = yield call(fetchProfileApi);
        
        // Update persisted user data
        const currentUser = JSON.parse(localStorage.getItem('user')) || {};
        const updatedUser = { ...currentUser, ...data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        yield put(actions.fetchProfileSuccess(data));
    } catch (error) {
        yield put(actions.fetchProfileFailure(error.message));
    }
}

function* handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
}

export default function* authSaga() {
    yield takeLatest(types.LOGIN_REQUEST, handleLogin);
    yield takeLatest(types.REFRESH_TOKEN_REQUEST, handleRefreshToken);
    yield takeLatest(types.FETCH_PROFILE_REQUEST, handleFetchProfile);
    yield takeLatest(types.LOGOUT, handleLogout);
}
