import * as types from '../types/studentDashboardTypes';

const initialState = {
  loading: false,
  data: null,
  error: null,
  profile: {
    loading: false,
    data: null,
    error: null
  },
  remarks: {
    loading: false,
    data: [],
    error: null
  },
  staffList: {
    loading: false,
    data: [],
    error: null
  },
  submission: {
    loading: false,
    success: false,
    error: null
  },
  subjectAnalysis: {
    loading: false,
    data: null,
    error: null
  },
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
    case types.FETCH_STUDENT_PROFILE_REQUEST:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: true,
          error: null
        }
      };
    case types.FETCH_STUDENT_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case types.FETCH_STUDENT_PROFILE_FAILURE:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
          error: action.payload
        }
      };
    case types.FETCH_STUDENT_REMARKS_REQUEST:
      return {
        ...state,
        remarks: {
          ...state.remarks,
          loading: true,
          error: null
        }
      };
    case types.FETCH_STUDENT_REMARKS_SUCCESS:
      return {
        ...state,
        remarks: {
          ...state.remarks,
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case types.FETCH_STUDENT_REMARKS_FAILURE:
      return {
        ...state,
        remarks: {
          ...state.remarks,
          loading: false,
          error: action.payload
        }
      };
    case types.SET_STUDENT_DASHBOARD_SEMESTER:
      return {
        ...state,
        selectedSemester: action.payload
      };
    case types.FETCH_STAFF_LIST_REQUEST:
      return {
        ...state,
        staffList: { ...state.staffList, loading: true, error: null }
      };
    case types.FETCH_STAFF_LIST_SUCCESS:
      return {
        ...state,
        staffList: { ...state.staffList, loading: false, data: action.payload, error: null }
      };
    case types.FETCH_STAFF_LIST_FAILURE:
      return {
        ...state,
        staffList: { ...state.staffList, loading: false, error: action.payload }
      };
    case types.SUBMIT_REMARK_REQUEST:
      return {
        ...state,
        submission: { ...state.submission, loading: true, success: false, error: null }
      };
    case types.SUBMIT_REMARK_SUCCESS:
      return {
        ...state,
        submission: { ...state.submission, loading: false, success: true, error: null }
      };
    case types.SUBMIT_REMARK_FAILURE:
      return {
        ...state,
        submission: { ...state.submission, loading: false, success: false, error: action.payload }
      };
    case types.FETCH_STUDENT_SUBMISSION_DETAILS_REQUEST:
      return {
        ...state,
        subjectAnalysis: {
          ...state.subjectAnalysis,
          loading: true,
          error: null
        }
      };
    case types.FETCH_STUDENT_SUBMISSION_DETAILS_SUCCESS:
      return {
        ...state,
        subjectAnalysis: {
          ...state.subjectAnalysis,
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case types.FETCH_STUDENT_SUBMISSION_DETAILS_FAILURE:
      return {
        ...state,
        subjectAnalysis: {
          ...state.subjectAnalysis,
          loading: false,
          error: action.payload
        }
      };
    default:
      return state;
  }
};

export default studentDashboardReducer;
