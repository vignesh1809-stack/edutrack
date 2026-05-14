import * as types from '../types/studentDashboardTypes';

export const fetchStudentDashboardRequest = (semester) => ({
  type: types.FETCH_STUDENT_DASHBOARD_REQUEST,
  payload: { semester }
});

export const fetchStudentDashboardSuccess = (data) => ({
  type: types.FETCH_STUDENT_DASHBOARD_SUCCESS,
  payload: data
});

export const fetchStudentDashboardFailure = (error) => ({
  type: types.FETCH_STUDENT_DASHBOARD_FAILURE,
  payload: error
});

export const fetchStudentProfileRequest = () => ({
  type: types.FETCH_STUDENT_PROFILE_REQUEST
});

export const fetchStudentProfileSuccess = (data) => ({
  type: types.FETCH_STUDENT_PROFILE_SUCCESS,
  payload: data
});

export const fetchStudentProfileFailure = (error) => ({
  type: types.FETCH_STUDENT_PROFILE_FAILURE,
  payload: error
});

export const fetchStudentRemarksRequest = () => ({
  type: types.FETCH_STUDENT_REMARKS_REQUEST
});

export const fetchStudentRemarksSuccess = (data) => ({
  type: types.FETCH_STUDENT_REMARKS_SUCCESS,
  payload: data
});

export const fetchStudentRemarksFailure = (error) => ({
  type: types.FETCH_STUDENT_REMARKS_FAILURE,
  payload: error
});

export const setStudentDashboardSemester = (semester) => ({
  type: types.SET_STUDENT_DASHBOARD_SEMESTER,
  payload: semester
});

export const submitRemarkRequest = (remarkData, callback) => ({
  type: types.SUBMIT_REMARK_REQUEST,
  payload: { remarkData, callback }
});

export const submitRemarkSuccess = () => ({
  type: types.SUBMIT_REMARK_SUCCESS
});

export const submitRemarkFailure = (error) => ({
  type: types.SUBMIT_REMARK_FAILURE,
  payload: error
});

export const fetchStaffListRequest = () => ({
  type: types.FETCH_STAFF_LIST_REQUEST
});

export const fetchStaffListSuccess = (data) => ({
  type: types.FETCH_STAFF_LIST_SUCCESS,
  payload: data
});

export const fetchStaffListFailure = (error) => ({
  type: types.FETCH_STAFF_LIST_FAILURE,
  payload: error
});
