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

export const setStudentDashboardSemester = (semester) => ({
  type: types.SET_STUDENT_DASHBOARD_SEMESTER,
  payload: semester
});
