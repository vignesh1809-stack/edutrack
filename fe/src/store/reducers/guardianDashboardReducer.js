import * as types from '../types/guardianDashboardTypes';

const initialState = {
    loading: false,
    data: null,
    error: null,
    selectedChildId: null,
    selectedSemester: null
};

export default function guardianDashboardReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_GUARDIAN_DASHBOARD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.FETCH_GUARDIAN_DASHBOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
                // Default to the first child if none selected
                selectedChildId: state.selectedChildId || (action.payload.children?.[0]?.id)
            };
        case types.FETCH_GUARDIAN_DASHBOARD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.SELECT_CHILD:
            return {
                ...state,
                selectedChildId: action.payload
            };
        case types.SET_SELECTED_SEMESTER:
            return {
                ...state,
                selectedSemester: action.payload
            };
        case types.FETCH_GUARDIAN_ATTENDANCE_SUCCESS:
            return {
                ...state,
                data: state.data ? {
                    ...state.data,
                    selectedChildData: {
                        ...state.data.selectedChildData,
                        data: {
                            ...state.data.selectedChildData?.data,
                            attendance: action.payload
                        }
                    }
                } : null
            };
        case types.FETCH_GUARDIAN_FEES_SUCCESS:
            return {
                ...state,
                data: state.data ? {
                    ...state.data,
                    selectedChildData: {
                        ...state.data.selectedChildData,
                        data: {
                            ...state.data.selectedChildData?.data,
                            financials: action.payload
                        }
                    }
                } : null
            };
        default:
            return state;
    }
}
