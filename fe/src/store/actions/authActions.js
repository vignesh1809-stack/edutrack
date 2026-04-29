import * as types from '../types/authTypes';

export const loginRequest = (credentials) => ({
    type: types.LOGIN_REQUEST,
    payload: credentials
});

export const loginSuccess = (authData) => ({
    type: types.LOGIN_SUCCESS,
    payload: authData
});

export const loginFailure = (error) => ({
    type: types.LOGIN_FAILURE,
    payload: error
});

export const logout = () => ({
    type: types.LOGOUT
});

export const clearAuthError = () => ({
    type: types.CLEAR_AUTH_ERROR
});

export const refreshTokenRequest = (refreshToken) => ({
    type: types.REFRESH_TOKEN_REQUEST,
    payload: refreshToken
});

export const refreshTokenSuccess = (tokens) => ({
    type: types.REFRESH_TOKEN_SUCCESS,
    payload: tokens
});

export const refreshTokenFailure = (error) => ({
    type: types.REFRESH_TOKEN_FAILURE,
    payload: error
});
