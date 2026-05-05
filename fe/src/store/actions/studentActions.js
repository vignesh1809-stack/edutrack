import {
    FETCH_STUDENTS_REQUEST,
    FETCH_STUDENTS_SUCCESS,
    FETCH_STUDENTS_FAILURE,
    SET_STUDENT_FILTER,
    SET_STUDENT_PAGE,
    RESET_STUDENT_FILTERS,
    FETCH_FILTERS_REQUEST,
    FETCH_FILTERS_SUCCESS,
    FETCH_FILTERS_FAILURE
} from '../types/studentTypes';

export const fetchFiltersRequest = () => ({
    type: FETCH_FILTERS_REQUEST
});

export const fetchFiltersSuccess = (data) => ({
    type: FETCH_FILTERS_SUCCESS,
    payload: data
});

export const fetchFiltersFailure = (error) => ({
    type: FETCH_FILTERS_FAILURE,
    payload: error
});

export const fetchStudentsRequest = () => ({
    type: FETCH_STUDENTS_REQUEST
});

export const fetchStudentsSuccess = (data) => ({
    type: FETCH_STUDENTS_SUCCESS,
    payload: data
});

export const fetchStudentsFailure = (error) => ({
    type: FETCH_STUDENTS_FAILURE,
    payload: error
});

export const setStudentFilter = (filterKey, filterValue) => ({
    type: SET_STUDENT_FILTER,
    payload: { filterKey, filterValue }
});

export const setStudentPage = (page) => ({
    type: SET_STUDENT_PAGE,
    payload: page
});

export const resetStudentFilters = () => ({
    type: RESET_STUDENT_FILTERS
});
