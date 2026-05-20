import { call, put, takeLatest, all } from 'redux-saga/effects';
import axiosInstance from '../../api/axiosInstance';
import {
    FETCH_PAPER_MASTER_DATA_REQUEST,
    FETCH_PAPER_SUBMISSIONS_REQUEST,
    SUBMIT_PAPER_GRADING_REQUEST
} from '../types/paperTypes';
import {
    fetchPaperMasterDataSuccess,
    fetchPaperMasterDataFailure,
    fetchPaperSubmissionsSuccess,
    fetchPaperSubmissionsFailure,
    submitPaperGradingSuccess,
    submitPaperGradingFailure,
    fetchPaperSubmissionsRequest
} from '../actions/paperActions';

function* fetchPaperMasterDataWorker() {
    try {
        const [studentsRes, coursesRes] = yield all([
            call(axiosInstance.get, '/api/staff/papers/students'),
            call(axiosInstance.get, '/api/staff/papers/courses')
        ]);
        yield put(fetchPaperMasterDataSuccess({
            students: studentsRes.data,
            courses: coursesRes.data
        }));
    } catch (error) {
        console.error('Error fetching paper master data:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch master data';
        yield put(fetchPaperMasterDataFailure(errorMessage));
    }
}

function* fetchPaperSubmissionsWorker() {
    try {
        const response = yield call(axiosInstance.get, '/api/staff/papers/submissions');
        yield put(fetchPaperSubmissionsSuccess(response.data));
    } catch (error) {
        console.error('Error fetching paper submissions:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch submissions';
        yield put(fetchPaperSubmissionsFailure(errorMessage));
    }
}

function* submitPaperGradingWorker(action) {
    const { formData, resolve, reject } = action.payload;
    try {
        const response = yield call(axiosInstance.post, '/api/staff/papers/submit', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        yield put(submitPaperGradingSuccess(response.data));
        
        // Trigger auto-refresh of submissions after a successful submit
        yield put(fetchPaperSubmissionsRequest());

        if (resolve) {
            resolve(response.data);
        }
    } catch (error) {
        console.error('Error submitting paper grading:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to submit paper grading';
        yield put(submitPaperGradingFailure(errorMessage));
        
        if (reject) {
            reject(error);
        }
    }
}

export function* paperWatcherSaga() {
    yield takeLatest(FETCH_PAPER_MASTER_DATA_REQUEST, fetchPaperMasterDataWorker);
    yield takeLatest(FETCH_PAPER_SUBMISSIONS_REQUEST, fetchPaperSubmissionsWorker);
    yield takeLatest(SUBMIT_PAPER_GRADING_REQUEST, submitPaperGradingWorker);
}
