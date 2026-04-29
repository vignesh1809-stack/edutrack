import * as types from '../types/dashboardTypes';

export const fetchPrincipalDashboardRequest = () => ({
    type: types.FETCH_PRINCIPAL_DASHBOARD_REQUEST,
});

export const fetchPrincipalDashboardSuccess = (data) => ({
    type: types.FETCH_PRINCIPAL_DASHBOARD_SUCCESS,
    payload: data,
});

export const fetchPrincipalDashboardFailure = (error) => ({
    type: types.FETCH_PRINCIPAL_DASHBOARD_FAILURE,
    payload: error,
});
