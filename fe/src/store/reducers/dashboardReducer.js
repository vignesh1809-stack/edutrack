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
};

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
};

export default dashboardReducer;
