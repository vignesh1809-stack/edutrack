import {
    FETCH_STUDENTS_REQUEST,
    FETCH_STUDENTS_SUCCESS,
    FETCH_STUDENTS_FAILURE,
    SET_STUDENT_FILTER,
    SET_STUDENT_SORT,
    SET_STUDENT_PAGE,
    RESET_STUDENT_FILTERS,
    FETCH_FILTERS_REQUEST,
    FETCH_FILTERS_SUCCESS,
    FETCH_FILTERS_FAILURE,
    FETCH_TOP_PERFORMERS_REQUEST,
    FETCH_TOP_PERFORMERS_SUCCESS,
    FETCH_TOP_PERFORMERS_FAILURE
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

export const fetchTopPerformersRequest = (filters = {}) => ({
    type: FETCH_TOP_PERFORMERS_REQUEST,
    payload: filters
});

export const fetchTopPerformersSuccess = (data) => ({
    type: FETCH_TOP_PERFORMERS_SUCCESS,
    payload: data
});

export const fetchTopPerformersFailure = (error) => ({
    type: FETCH_TOP_PERFORMERS_FAILURE,
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

export const setStudentSort = (sort) => ({
    type: SET_STUDENT_SORT,
    payload: sort
});

export const setStudentPage = (page) => ({
    type: SET_STUDENT_PAGE,
    payload: page
});

export const resetStudentFilters = () => ({
    type: RESET_STUDENT_FILTERS
});
