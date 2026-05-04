import * as types from '../types/dashboardTypes';

const initialState = {
    loading: false,
    data: {
        totalStudents: 0,
        studentsMarkedToday: 0,
        attendancePercentageToday: 0,
        totalBuses: 0,
        busesArrivedToday: 0,
        remarksSubmittedToday: 0,
        totalRemarks: 0,
        latestRemarks: []
    },
    error: null,
    graphLoading: false,
    graphData: [],
    graphError: null,
    filters: {
        year: 'All Years',
        section: 'All Sections'
    },
    availableYears: [],
    availableSections: [],
    availableAssessmentTypes: [],
    marksDistribution: [],
    marksLoading: false,
    marksError: null,
};

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_DASHBOARD_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.payload
                }
            };
        case types.FETCH_YEARS_SUCCESS:
            return {
                ...state,
                availableYears: action.payload
            };
        case types.FETCH_SECTIONS_SUCCESS:
            return {
                ...state,
                availableSections: action.payload
            };
        case types.FETCH_ASSESSMENT_TYPES_SUCCESS:
            return {
                ...state,
                availableAssessmentTypes: action.payload
            };
        case types.FETCH_MARKS_DISTRIBUTION_REQUEST:
            return {
                ...state,
                marksLoading: true,
                marksError: null,
            };
        case types.FETCH_MARKS_DISTRIBUTION_SUCCESS:
            return {
                ...state,
                marksLoading: false,
                marksDistribution: action.payload,
            };
        case types.FETCH_MARKS_DISTRIBUTION_FAILURE:
            return {
                ...state,
                marksLoading: false,
                marksError: action.payload,
            };
        case types.FETCH_PRINCIPAL_DASHBOARD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case types.FETCH_PRINCIPAL_DASHBOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case types.FETCH_PRINCIPAL_DASHBOARD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case types.FETCH_STAFF_ATTENDANCE_GRAPH_REQUEST:
            return {
                ...state,
                graphLoading: true,
                graphError: null,
            };
        case types.FETCH_STAFF_ATTENDANCE_GRAPH_SUCCESS:
            return {
                ...state,
                graphLoading: false,
                graphData: action.payload,
            };
        case types.FETCH_STAFF_ATTENDANCE_GRAPH_FAILURE:
            return {
                ...state,
                graphLoading: false,
                graphError: action.payload,
            };
        default:
            return state;
    }
};

export default dashboardReducer;
