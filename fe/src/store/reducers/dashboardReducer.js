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
    marksDistribution: {
        data: null,
        loading: false,
        error: null,
    },
    attendanceTrends: {
        months: [],
        series: [],
        loading: false,
        error: null,
    },
    departmentAverages: {
        data: [],
        loading: false,
        error: null,
    },
    leastPerformedStaff: {
        data: [],
        loading: false,
        error: null,
    }
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
        case types.FETCH_LECTURER_DASHBOARD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case types.FETCH_LECTURER_DASHBOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case types.FETCH_LECTURER_DASHBOARD_FAILURE:
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
        case types.FETCH_ATTENDANCE_TRENDS_REQUEST:
            return {
                ...state,
                attendanceTrends: {
                    ...state.attendanceTrends,
                    loading: true,
                    error: null,
                },
            };
        case types.FETCH_ATTENDANCE_TRENDS_SUCCESS:
            return {
                ...state,
                attendanceTrends: {
                    ...state.attendanceTrends,
                    months: action.payload?.months || [],
                    series: action.payload?.series || [],
                    loading: false,
                    error: null,
                },
            };
        case types.FETCH_ATTENDANCE_TRENDS_FAILURE:
            return {
                ...state,
                attendanceTrends: {
                    ...state.attendanceTrends,
                    loading: false,
                    error: action.payload,
                },
            };
        case types.FETCH_DEPARTMENT_AVERAGES_REQUEST:
            return {
                ...state,
                departmentAverages: {
                    ...state.departmentAverages,
                    loading: true,
                    error: null,
                },
            };
        case types.FETCH_DEPARTMENT_AVERAGES_SUCCESS:
            return {
                ...state,
                departmentAverages: {
                    ...state.departmentAverages,
                    data: action.payload || [],
                    loading: false,
                    error: null,
                },
            };
        case types.FETCH_DEPARTMENT_AVERAGES_FAILURE:
            return {
                ...state,
                departmentAverages: {
                    ...state.departmentAverages,
                    loading: false,
                    error: action.payload,
                },
            };
        case types.FETCH_LEAST_PERFORMED_STAFF_REQUEST:
            return {
                ...state,
                leastPerformedStaff: {
                    ...state.leastPerformedStaff,
                    loading: true,
                    error: null,
                },
            };
        case types.FETCH_LEAST_PERFORMED_STAFF_SUCCESS:
            return {
                ...state,
                leastPerformedStaff: {
                    ...state.leastPerformedStaff,
                    data: action.payload || [],
                    loading: false,
                    error: null,
                },
            };
        case types.FETCH_LEAST_PERFORMED_STAFF_FAILURE:
            return {
                ...state,
                leastPerformedStaff: {
                    ...state.leastPerformedStaff,
                    loading: false,
                    error: action.payload,
                },
            };
        default:
            return state;
    }
};

export default dashboardReducer;
