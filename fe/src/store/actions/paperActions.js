import {
    FETCH_PAPER_MASTER_DATA_REQUEST,
    FETCH_PAPER_MASTER_DATA_SUCCESS,
    FETCH_PAPER_MASTER_DATA_FAILURE,

    FETCH_PAPER_SUBMISSIONS_REQUEST,
    FETCH_PAPER_SUBMISSIONS_SUCCESS,
    FETCH_PAPER_SUBMISSIONS_FAILURE,

    SUBMIT_PAPER_GRADING_REQUEST,
    SUBMIT_PAPER_GRADING_SUCCESS,
    SUBMIT_PAPER_GRADING_FAILURE
} from '../types/paperTypes';

// Fetch Paper Master Data Actions (students and courses)
export const fetchPaperMasterDataRequest = () => ({
    type: FETCH_PAPER_MASTER_DATA_REQUEST
});

export const fetchPaperMasterDataSuccess = (data) => ({
    type: FETCH_PAPER_MASTER_DATA_SUCCESS,
    payload: data // Contains { students, courses }
});

export const fetchPaperMasterDataFailure = (error) => ({
    type: FETCH_PAPER_MASTER_DATA_FAILURE,
    payload: error
});

// Fetch Submissions / Grading History Actions
export const fetchPaperSubmissionsRequest = () => ({
    type: FETCH_PAPER_SUBMISSIONS_REQUEST
});

export const fetchPaperSubmissionsSuccess = (submissions) => ({
    type: FETCH_PAPER_SUBMISSIONS_SUCCESS,
    payload: submissions
});

export const fetchPaperSubmissionsFailure = (error) => ({
    type: FETCH_PAPER_SUBMISSIONS_FAILURE,
    payload: error
});

// Submit Handwritten Script Actions
export const submitPaperGradingRequest = (formData, resolve, reject) => ({
    type: SUBMIT_PAPER_GRADING_REQUEST,
    payload: { formData, resolve, reject }
});

export const submitPaperGradingSuccess = (data) => ({
    type: SUBMIT_PAPER_GRADING_SUCCESS,
    payload: data
});

export const submitPaperGradingFailure = (error) => ({
    type: SUBMIT_PAPER_GRADING_FAILURE,
    payload: error
});
