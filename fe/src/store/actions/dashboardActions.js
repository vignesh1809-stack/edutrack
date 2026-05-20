import * as types from '../types/dashboardTypes';

export const fetchPrincipalDashboardRequest = (filters = {}) => ({
    type: types.FETCH_PRINCIPAL_DASHBOARD_REQUEST,
    payload: filters,
});

export const fetchPrincipalDashboardSuccess = (data) => ({
    type: types.FETCH_PRINCIPAL_DASHBOARD_SUCCESS,
    payload: data,
});

export const fetchPrincipalDashboardFailure = (error) => ({
    type: types.FETCH_PRINCIPAL_DASHBOARD_FAILURE,
    payload: error,
});

export const fetchStaffAttendanceGraphRequest = (params = { days: 7 }) => ({
    type: types.FETCH_STAFF_ATTENDANCE_GRAPH_REQUEST,
    payload: params,
});

export const fetchStaffAttendanceGraphSuccess = (data) => ({
    type: types.FETCH_STAFF_ATTENDANCE_GRAPH_SUCCESS,
    payload: data,
});

export const fetchStaffAttendanceGraphFailure = (error) => ({
    type: types.FETCH_STAFF_ATTENDANCE_GRAPH_FAILURE,
    payload: error,
});

export const setDashboardFilter = (filter) => ({
    type: types.SET_DASHBOARD_FILTER,
    payload: filter,
});

export const fetchYearsRequest = () => ({
    type: types.FETCH_YEARS_REQUEST,
});

export const fetchYearsSuccess = (years) => ({
    type: types.FETCH_YEARS_SUCCESS,
    payload: years,
});

export const fetchYearsFailure = (error) => ({
    type: types.FETCH_YEARS_FAILURE,
    payload: error,
});

export const fetchSectionsRequest = (year) => ({
    type: types.FETCH_SECTIONS_REQUEST,
    payload: year,
});

export const fetchSectionsSuccess = (sections) => ({
    type: types.FETCH_SECTIONS_SUCCESS,
    payload: sections,
});

export const fetchSectionsFailure = (error) => ({
    type: types.FETCH_SECTIONS_FAILURE,
    payload: error,
});

export const fetchAssessmentTypesRequest = (filters) => ({
    type: types.FETCH_ASSESSMENT_TYPES_REQUEST,
    payload: filters,
});

export const fetchAssessmentTypesSuccess = (assessmentTypes) => ({
    type: types.FETCH_ASSESSMENT_TYPES_SUCCESS,
    payload: assessmentTypes,
});

export const fetchAssessmentTypesFailure = (error) => ({
    type: types.FETCH_ASSESSMENT_TYPES_FAILURE,
    payload: error,
});

export const fetchMarksDistributionRequest = (params) => ({
    type: types.FETCH_MARKS_DISTRIBUTION_REQUEST,
    payload: params,
});

export const fetchMarksDistributionSuccess = (distribution) => ({
    type: types.FETCH_MARKS_DISTRIBUTION_SUCCESS,
    payload: distribution,
});

export const fetchMarksDistributionFailure = (error) => ({
    type: types.FETCH_MARKS_DISTRIBUTION_FAILURE,
    payload: error,
});

export const fetchAttendanceTrendsRequest = (filters) => ({
    type: types.FETCH_ATTENDANCE_TRENDS_REQUEST,
    payload: filters,
});

export const fetchAttendanceTrendsSuccess = (data) => ({
    type: types.FETCH_ATTENDANCE_TRENDS_SUCCESS,
    payload: data,
});

export const fetchAttendanceTrendsFailure = (error) => ({
    type: types.FETCH_ATTENDANCE_TRENDS_FAILURE,
    payload: error,
});

export const fetchDepartmentAveragesRequest = (filters) => ({
    type: types.FETCH_DEPARTMENT_AVERAGES_REQUEST,
    payload: filters,
});

export const fetchDepartmentAveragesSuccess = (data) => ({
    type: types.FETCH_DEPARTMENT_AVERAGES_SUCCESS,
    payload: data,
});

export const fetchDepartmentAveragesFailure = (error) => ({
    type: types.FETCH_DEPARTMENT_AVERAGES_FAILURE,
    payload: error,
});

export const fetchLeastPerformedStaffRequest = (filters) => ({
    type: types.FETCH_LEAST_PERFORMED_STAFF_REQUEST,
    payload: filters,
});

export const fetchLeastPerformedStaffSuccess = (data) => ({
    type: types.FETCH_LEAST_PERFORMED_STAFF_SUCCESS,
    payload: data,
});

export const fetchLeastPerformedStaffFailure = (error) => ({
    type: types.FETCH_LEAST_PERFORMED_STAFF_FAILURE,
    payload: error,
});

export const fetchLecturerDashboardRequest = (courseId) => ({
    type: types.FETCH_LECTURER_DASHBOARD_REQUEST,
    payload: courseId,
});

export const fetchLecturerDashboardSuccess = (data) => ({
    type: types.FETCH_LECTURER_DASHBOARD_SUCCESS,
    payload: data,
});

export const fetchLecturerDashboardFailure = (error) => ({
    type: types.FETCH_LECTURER_DASHBOARD_FAILURE,
    payload: error,
});

export const fetchStaffAttendanceClassRequest = (params) => ({
    type: types.FETCH_STAFF_ATTENDANCE_CLASS_REQUEST,
    payload: params, // { date, semester }
});

export const fetchStaffAttendanceClassSuccess = (data) => ({
    type: types.FETCH_STAFF_ATTENDANCE_CLASS_SUCCESS,
    payload: data,
});

export const fetchStaffAttendanceClassFailure = (error) => ({
    type: types.FETCH_STAFF_ATTENDANCE_CLASS_FAILURE,
    payload: error,
});

export const submitStaffAttendanceRequest = (payload) => ({
    type: types.SUBMIT_STAFF_ATTENDANCE_REQUEST,
    payload, // { recordDate, semester, records }
});

export const submitStaffAttendanceSuccess = (data) => ({
    type: types.SUBMIT_STAFF_ATTENDANCE_SUCCESS,
    payload: data,
});

export const submitStaffAttendanceFailure = (error) => ({
    type: types.SUBMIT_STAFF_ATTENDANCE_FAILURE,
    payload: error,
});

export const fetchStaffAttendanceHistoryRequest = (params) => ({
    type: types.FETCH_STAFF_ATTENDANCE_HISTORY_REQUEST,
    payload: params, // { limit }
});

export const fetchStaffAttendanceHistorySuccess = (data) => ({
    type: types.FETCH_STAFF_ATTENDANCE_HISTORY_SUCCESS,
    payload: data,
});

export const fetchStaffAttendanceHistoryFailure = (error) => ({
    type: types.FETCH_STAFF_ATTENDANCE_HISTORY_FAILURE,
    payload: error,
});
