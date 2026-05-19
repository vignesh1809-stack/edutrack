import * as types from '../types/transportTypes';

const initialState = {
  dashboard: {
    data: null,
    loading: false,
    error: null,
  },
  onDuty: {
    data: [],
    loading: false,
    error: null,
  },
  staff: {
    data: [],
    loading: false,
    error: null,
  },
  routes: {
    data: [],
    loading: false,
    error: null,
  },
  toggleStatus: {
    loading: false,
    error: null,
  }
};

const transportReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TRANSPORT_DASHBOARD_REQUEST:
      return { ...state, dashboard: { ...state.dashboard, loading: true, error: null } };
    case types.FETCH_TRANSPORT_DASHBOARD_SUCCESS:
      return { ...state, dashboard: { data: action.payload, loading: false, error: null } };
    case types.FETCH_TRANSPORT_DASHBOARD_FAILURE:
      return { ...state, dashboard: { ...state.dashboard, loading: false, error: action.error } };

    case types.FETCH_TRANSPORT_ON_DUTY_REQUEST:
      return { ...state, onDuty: { ...state.onDuty, loading: true, error: null } };
    case types.FETCH_TRANSPORT_ON_DUTY_SUCCESS:
      return { ...state, onDuty: { data: action.payload, loading: false, error: null } };
    case types.FETCH_TRANSPORT_ON_DUTY_FAILURE:
      return { ...state, onDuty: { ...state.onDuty, loading: false, error: action.error } };

    case types.FETCH_TRANSPORT_STAFF_REQUEST:
      return { ...state, staff: { ...state.staff, loading: true, error: null } };
    case types.FETCH_TRANSPORT_STAFF_SUCCESS:
      return { ...state, staff: { data: action.payload, loading: false, error: null } };
    case types.FETCH_TRANSPORT_STAFF_FAILURE:
      return { ...state, staff: { ...state.staff, loading: false, error: action.error } };

    case types.TOGGLE_STAFF_STATUS_REQUEST:
      return { ...state, toggleStatus: { loading: true, error: null } };
    case types.TOGGLE_STAFF_STATUS_SUCCESS:
      return { 
        ...state, 
        toggleStatus: { loading: false, error: null },
        staff: {
          ...state.staff,
          data: state.staff.data.map(s => s.id === action.payload ? { ...s, active: !s.active } : s)
        },
        onDuty: {
          ...state.onDuty,
          data: state.onDuty.data.map(s => s.id === action.payload ? { ...s, active: !s.active } : s)
        }
      };
    case types.TOGGLE_STAFF_STATUS_FAILURE:
      return { ...state, toggleStatus: { loading: false, error: action.error } };

    case types.FETCH_TRANSPORT_ROUTES_REQUEST:
      return { ...state, routes: { ...state.routes, loading: true, error: null } };
    case types.FETCH_TRANSPORT_ROUTES_SUCCESS:
      return { ...state, routes: { data: action.payload, loading: false, error: null } };
    case types.FETCH_TRANSPORT_ROUTES_FAILURE:
      return { ...state, routes: { ...state.routes, loading: false, error: action.error } };

    default:
      return state;
  }
};

export default transportReducer;
