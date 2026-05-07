import * as types from '../types/authTypes';

const initialState = {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_REQUEST:
        case types.REFRESH_TOKEN_REQUEST:
        case types.FETCH_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                user: action.payload.user,
                error: null
            };
        case types.FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                user: {
                    ...state.user,
                    ...action.payload
                }
            };
        case types.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                loading: false,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                error: null
            };
        case types.LOGIN_FAILURE:
        case types.REFRESH_TOKEN_FAILURE:
        case types.FETCH_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.LOGOUT:
            return {
                ...state,
                accessToken: null,
                refreshToken: null,
                user: null,
                error: null
            };
        case types.CLEAR_AUTH_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export default authReducer;
