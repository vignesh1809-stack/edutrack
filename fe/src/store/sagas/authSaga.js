import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../types/authTypes';
import * as actions from '../actions/authActions';

// Helper for API calls
const loginApi = async (credentials) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    const contentType = response.headers.get("content-type");
    let data = null;

    if (contentType && contentType.indexOf("application/json") !== -1) {
        try {
            data = await response.json();
        } catch (e) {
            console.error("JSON parsing error:", e);
        }
    } else {
        // Handle non-JSON responses (like plain text or empty)
        const text = await response.text();
        if (text) {
            data = { message: text };
        }
    }

    if (!response.ok) {
        throw new Error(data?.message || `Login failed with status ${response.status}`);
    }
    
    if (!data) {
        throw new Error("Empty response from server");
    }

    return data;
};

function* handleLogin(action) {
    try {
        const data = yield call(loginApi, action.payload);
        
        // Persist session
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        yield put(actions.loginSuccess(data));
    } catch (error) {
        yield put(actions.loginFailure(error.message));
    }
}

function* handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
}

export default function* authSaga() {
    yield takeLatest(types.LOGIN_REQUEST, handleLogin);
    yield takeLatest(types.LOGOUT, handleLogout);
}
