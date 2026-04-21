import * as types from '../types/authTypes';

const initialState = {
    token: localStorage.getItem('accessToken') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload.accessToken,
                user: action.payload.user,
                error: null
            };
        case types.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.LOGOUT:
            return {
                ...state,
                token: null,
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
