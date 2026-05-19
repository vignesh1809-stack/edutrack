import * as types from '../types/guardianDashboardTypes';

export const fetchGuardianDashboardRequest = (studentId, semester) => ({
    type: types.FETCH_GUARDIAN_DASHBOARD_REQUEST,
    payload: { studentId, semester }
});

export const fetchGuardianDashboardSuccess = (data) => ({
    type: types.FETCH_GUARDIAN_DASHBOARD_SUCCESS,
    payload: data
});

export const fetchGuardianDashboardFailure = (error) => ({
    type: types.FETCH_GUARDIAN_DASHBOARD_FAILURE,
    payload: error
});

export const selectChild = (childId) => ({
    type: types.SELECT_CHILD,
    payload: childId
});
