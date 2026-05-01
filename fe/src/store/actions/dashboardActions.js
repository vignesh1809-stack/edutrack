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

export const fetchStaffAttendanceGraphRequest = (days = 7) => ({
    type: types.FETCH_STAFF_ATTENDANCE_GRAPH_REQUEST,
    payload: days,
});

export const fetchStaffAttendanceGraphSuccess = (data) => ({
    type: types.FETCH_STAFF_ATTENDANCE_GRAPH_SUCCESS,
    payload: data,
});

export const fetchStaffAttendanceGraphFailure = (error) => ({
    type: types.FETCH_STAFF_ATTENDANCE_GRAPH_FAILURE,
    payload: error,
});
