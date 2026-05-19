import * as types from '../types/guardianDashboardTypes';

const initialState = {
    loading: false,
    data: null,
    error: null,
    selectedChildId: null
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
        default:
            return state;
    }
}
