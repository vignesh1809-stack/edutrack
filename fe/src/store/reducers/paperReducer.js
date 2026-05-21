import {
    FETCH_PAPER_MASTER_DATA_REQUEST,
    FETCH_PAPER_MASTER_DATA_SUCCESS,
    FETCH_PAPER_MASTER_DATA_FAILURE,

    FETCH_PAPER_SUBMISSIONS_REQUEST,
    FETCH_PAPER_SUBMISSIONS_SUCCESS,
    FETCH_PAPER_SUBMISSIONS_FAILURE,

    SUBMIT_PAPER_GRADING_REQUEST,
    SUBMIT_PAPER_GRADING_SUCCESS,
    SUBMIT_PAPER_GRADING_FAILURE,
    UPDATE_PAPER_SUBMISSION
} from '../types/paperTypes';

const initialState = {
    students: [],
    courses: [],
    submissions: [],
    loading: false,
    submitLoading: false,
    error: null,
    submitError: null
};

const paperReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PAPER_MASTER_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_PAPER_MASTER_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                students: action.payload.students,
                courses: action.payload.courses
            };
        case FETCH_PAPER_MASTER_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case FETCH_PAPER_SUBMISSIONS_REQUEST:
            return {
                ...state,
                loading: state.submissions.length === 0, // only set loading spinner if we don't have submissions yet
                error: null
            };
        case FETCH_PAPER_SUBMISSIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                submissions: action.payload
            };
        case FETCH_PAPER_SUBMISSIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case SUBMIT_PAPER_GRADING_REQUEST:
            return {
                ...state,
                submitLoading: true,
                submitError: null
            };
        case SUBMIT_PAPER_GRADING_SUCCESS:
            return {
                ...state,
                submitLoading: false
            };
        case SUBMIT_PAPER_GRADING_FAILURE:
            return {
                ...state,
                submitLoading: false,
                submitError: action.payload
            };
        case UPDATE_PAPER_SUBMISSION: {
            const updatedSub = action.payload;
            const exists = state.submissions.some(s => s.id === updatedSub.id);
            let newSubmissions;
            if (exists) {
                newSubmissions = state.submissions.map(s => s.id === updatedSub.id ? updatedSub : s);
            } else {
                newSubmissions = [updatedSub, ...state.submissions];
            }
            return {
                ...state,
                submissions: newSubmissions
            };
        }
        default:
            return state;
    }
};

export default paperReducer;
