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

export const setSelectedSemester = (semester) => ({
    type: types.SET_SELECTED_SEMESTER,
    payload: semester
});

export const fetchGuardianAttendanceRequest = (studentId, semester) => ({
    type: types.FETCH_GUARDIAN_ATTENDANCE_REQUEST,
    payload: { studentId, semester }
});

export const fetchGuardianAttendanceSuccess = (data) => ({
    type: types.FETCH_GUARDIAN_ATTENDANCE_SUCCESS,
    payload: data
});

export const fetchGuardianAttendanceFailure = (error) => ({
    type: types.FETCH_GUARDIAN_ATTENDANCE_FAILURE,
    payload: error
});

export const fetchGuardianFeesRequest = (studentId) => ({
    type: types.FETCH_GUARDIAN_FEES_REQUEST,
    payload: { studentId }
});

export const fetchGuardianFeesSuccess = (data) => ({
    type: types.FETCH_GUARDIAN_FEES_SUCCESS,
    payload: data
});

export const fetchGuardianFeesFailure = (error) => ({
    type: types.FETCH_GUARDIAN_FEES_FAILURE,
    payload: error
});
