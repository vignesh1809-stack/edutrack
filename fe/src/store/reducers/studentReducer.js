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

const initialState = {
    data: [],
    branches: [],
    years: [],
    pagination: {
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0,
        last: false,
        first: true
    },
    filters: {
        search: '',
        status: '',
        course: '', // Branch
        year: '',
        section: ''
    },
    sort: '',
    loading: false,
    error: null,
    topPerformers: {
        data: [],
        loading: false,
        error: null
    }
};

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STUDENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_STUDENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.content,
                pagination: {
                    page: action.payload.pageable.pageNumber,
                    size: action.payload.pageable.pageSize,
                    totalPages: action.payload.totalPages,
                    totalElements: action.payload.totalElements,
                    last: action.payload.last,
                    first: action.payload.first
                }
            };
        case FETCH_STUDENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case SET_STUDENT_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.filterKey]: action.payload.filterValue
                },
                // Reset to page 0 when any filter changes
                pagination: {
                    ...state.pagination,
                    page: 0
                }
            };
        case SET_STUDENT_SORT:
            return {
                ...state,
                sort: action.payload,
                pagination: {
                    ...state.pagination,
                    page: 0
                }
            };
        case SET_STUDENT_PAGE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page: action.payload
                }
            };
        case RESET_STUDENT_FILTERS:
            return {
                ...state,
                filters: initialState.filters,
                pagination: {
                    ...state.pagination,
                    page: 0
                }
            };
        case FETCH_FILTERS_SUCCESS:
            return {
                ...state,
                branches: action.payload.branches,
                years: action.payload.years
            };
        case FETCH_TOP_PERFORMERS_REQUEST:
            return {
                ...state,
                topPerformers: {
                    ...state.topPerformers,
                    loading: true,
                    error: null
                }
            };
        case FETCH_TOP_PERFORMERS_SUCCESS:
            return {
                ...state,
                topPerformers: {
                    ...state.topPerformers,
                    data: action.payload,
                    loading: false,
                    error: null
                }
            };
        case FETCH_TOP_PERFORMERS_FAILURE:
            return {
                ...state,
                topPerformers: {
                    ...state.topPerformers,
                    loading: false,
                    error: action.payload
                }
            };
        default:
            return state;
    }
}

export default studentReducer;
