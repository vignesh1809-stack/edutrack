import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import axiosInstance from '../../api/axiosInstance';
import {
    FETCH_STUDENTS_REQUEST,
    SET_STUDENT_FILTER,
    SET_STUDENT_SORT,
    SET_STUDENT_PAGE,
    FETCH_FILTERS_REQUEST,
    FETCH_TOP_PERFORMERS_REQUEST
} from '../types/studentTypes';
import {
    fetchStudentsSuccess,
    fetchStudentsFailure,
    fetchStudentsRequest,
    fetchFiltersSuccess,
    fetchFiltersFailure,
    fetchTopPerformersSuccess,
    fetchTopPerformersFailure
} from '../actions/studentActions';

// Selectors to get current state
const getStudentsState = (state) => state.students;

function* fetchFiltersWorker() {
    try {
        const [branchesResponse, yearsResponse] = yield all([
            call(axiosInstance.get, '/api/principal/students/filters/branches'),
            call(axiosInstance.get, '/api/principal/students/filters/years')
        ]);
        
        yield put(fetchFiltersSuccess({
            branches: branchesResponse.data,
            years: yearsResponse.data
        }));
    } catch (error) {
        console.error('Error fetching student filters:', error);
        yield put(fetchFiltersFailure(error.message));
    }
}

function* fetchStudentsWorker() {
    try {
        const { pagination, filters, sort } = yield select(getStudentsState);
        
        // Build query params dynamically
        const params = new URLSearchParams();
        params.append('page', pagination.page);
        params.append('size', pagination.size);
        
        if (sort) params.append('sort', sort);
        
        if (filters.search) params.append('search', filters.search);
        if (filters.status) params.append('status', filters.status);
        if (filters.course) params.append('course', filters.course);
        if (filters.year) params.append('year', filters.year);
        if (filters.section) params.append('section', filters.section);

        const response = yield call(axiosInstance.get, `/api/principal/students?${params.toString()}`);
        
        yield put(fetchStudentsSuccess(response.data));
    } catch (error) {
        console.error('Error fetching students:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch students';
        yield put(fetchStudentsFailure(errorMessage));
    }
}

// When a filter or page changes, we just dispatch a new fetch request
function* handleFilterOrPageChange() {
    yield put(fetchStudentsRequest());
}

function* fetchTopPerformersWorker(action) {
    try {
        const filters = action.payload || {};
        
        // Build query params — uses the same /api/principal/students endpoint
        const params = new URLSearchParams();
        params.append('page', '0');
        params.append('size', '3');
        params.append('sort', 'cgpa,desc');
        
        if (filters.branch && filters.branch !== 'All Branches') {
            params.append('course', filters.branch);
        }
        if (filters.year && filters.year !== 'All Years') {
            params.append('year', filters.year);
        }

        const response = yield call(axiosInstance.get, `/api/principal/students?${params.toString()}`);
        yield put(fetchTopPerformersSuccess(response.data.content));
    } catch (error) {
        yield put(fetchTopPerformersFailure(error.message));
    }
}

export function* studentWatcherSaga() {
    yield takeLatest(FETCH_STUDENTS_REQUEST, fetchStudentsWorker);
    yield takeLatest(FETCH_FILTERS_REQUEST, fetchFiltersWorker);
    yield takeLatest(FETCH_TOP_PERFORMERS_REQUEST, fetchTopPerformersWorker);
    // Also trigger fetch when filters, sort or page changes
    yield takeLatest([SET_STUDENT_FILTER, SET_STUDENT_SORT, SET_STUDENT_PAGE], handleFilterOrPageChange);
}
