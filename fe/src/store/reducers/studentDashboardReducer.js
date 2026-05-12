import * as types from '../types/studentDashboardTypes';

const initialState = {
  loading: false,
  data: null,
  error: null,
  selectedSemester: null
};

const studentDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_STUDENT_DASHBOARD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.FETCH_STUDENT_DASHBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null
      };
    case types.FETCH_STUDENT_DASHBOARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.SET_STUDENT_DASHBOARD_SEMESTER:
      return {
        ...state,
        selectedSemester: action.payload
      };
    default:
      return state;
  }
};

export default studentDashboardReducer;
