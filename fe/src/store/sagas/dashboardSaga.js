import { takeLatest, put, call, select } from 'redux-saga/effects';
import * as types from '../types/dashboardTypes';
import * as actions from '../actions/dashboardActions';
import axiosInstance from '../../api/axiosInstance';

// API selector for access token
const getAccessToken = (state) => state.auth.accessToken;
const getInstitutionId = (state) => state.auth.user?.institutionId;

function* handleFetchDashboard(action) {
    try {
        const filters = action.payload || {};
        let url = '/api/principal/dashboard';
        const params = [];

        if (filters.year && filters.year !== 'All Years') {
            params.push(`year=${filters.year}`);
        }
        if (filters.section && filters.section !== 'All Sections') {
            params.push(`section=${filters.section}`);
        }
        if (filters.branch && filters.branch !== 'All Branches') {
            params.push(`branch=${filters.branch}`);
        }

        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }

        const response = yield call(axiosInstance.get, url);
        yield put(actions.fetchPrincipalDashboardSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchPrincipalDashboardFailure(error.message));
    }
}

function* handleFetchStaffAttendanceGraph(action) {
    try {
        const { days = 7, filters = {} } = action.payload || {};
        let url = `/api/staff/dashboard/attendance-graph?days=${days}`;
        
        if (filters.year && filters.year !== 'All Years') {
            url += `&year=${filters.year}`;
        }
        if (filters.section && filters.section !== 'All Sections') {
            url += `&section=${filters.section}`;
        }

        const response = yield call(axiosInstance.get, url);
        yield put(actions.fetchStaffAttendanceGraphSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchStaffAttendanceGraphFailure(
            error.response?.data?.message || error.message || 'Failed to fetch attendance graph'
        ));
    }
}

function* handleFetchYears() {
    try {
        const institutionId = yield select(getInstitutionId);
        if (!institutionId) return;
        
        const response = yield call(axiosInstance.get, `/api/departments/years?institutionId=${institutionId}`);
        yield put(actions.fetchYearsSuccess(['All Years', ...response.data]));
    } catch (error) {
        yield put(actions.fetchYearsFailure(error.message));
    }
}

function* handleFetchSections(action) {
    try {
        const institutionId = yield select(getInstitutionId);
        if (!institutionId) return;

        const year = action.payload === 'All Years' ? '' : action.payload;
        let url = `/api/departments/sections?institutionId=${institutionId}`;
        if (year) {
            url += `&year=${year}`;
        }
        const response = yield call(axiosInstance.get, url);
        yield put(actions.fetchSectionsSuccess(['All Sections', ...response.data]));
    } catch (error) {
        yield put(actions.fetchSectionsFailure(error.message));
    }
}

function* handleFetchAssessmentTypes(action) {
    try {
        const filters = action.payload || {};
        let url = '/api/assessments/types';
        const params = [];
        if (filters.year && filters.year !== 'All Years') params.push(`year=${filters.year}`);
        if (filters.section && filters.section !== 'All Sections') params.push(`section=${filters.section}`);
        if (params.length > 0) url += `?${params.join('&')}`;

        const response = yield call(axiosInstance.get, url);
        yield put(actions.fetchAssessmentTypesSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchAssessmentTypesFailure(error.message));
    }
}

function* handleFetchMarksDistribution(action) {
    try {
        const { type, filters = {} } = action.payload;
        if (!type) return;

        let url = `/api/assessments/distribution?type=${type}`;
        if (filters.year && filters.year !== 'All Years') url += `&year=${filters.year}`;
        if (filters.section && filters.section !== 'All Sections') url += `&section=${filters.section}`;

        const response = yield call(axiosInstance.get, url);
        yield put(actions.fetchMarksDistributionSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchMarksDistributionFailure(error.message));
    }
}

function* handleFetchAttendanceTrends(action) {
    try {
        const filters = action.payload || {};
        let url = '/api/principal/attendance/trends?months=6';
        
        if (filters.year && filters.year !== 'All Years') {
            url += `&year=${filters.year}`;
        }
        if (filters.branch && filters.branch !== 'All Branches') {
            url += `&branch=${filters.branch}`;
        }

        const response = yield call(axiosInstance.get, url);
        yield put(actions.fetchAttendanceTrendsSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchAttendanceTrendsFailure(error.message));
    }
}

function* handleFetchDepartmentAverages(action) {
    try {
        const filters = action.payload || {};
        let url = '/api/principal/dashboard/department-averages?';
        
        const params = new URLSearchParams();
        if (filters.year && filters.year !== 'All Years') {
            params.append('year', filters.year);
        }
        if (filters.section && filters.section !== 'All Sections') {
            params.append('section', filters.section);
        }

        const response = yield call(axiosInstance.get, url + params.toString());
        yield put(actions.fetchDepartmentAveragesSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchDepartmentAveragesFailure(error.message));
    }
}

function* handleFetchLeastPerformedStaff(action) {
    try {
        const filters = action.payload || {};
        let url = '/api/principal/dashboard/least-performed-staff?';
        
        const params = new URLSearchParams();
        if (filters.year && filters.year !== 'All Years') {
            params.append('year', filters.year);
        }
        if (filters.section && filters.section !== 'All Sections') {
            params.append('section', filters.section);
        }
        if (filters.branch && filters.branch !== 'All Branches') {
            params.append('branch', filters.branch);
        }

        const response = yield call(axiosInstance.get, url + params.toString());
        yield put(actions.fetchLeastPerformedStaffSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchLeastPerformedStaffFailure(error.message));
    }
}

function* handleFetchLecturerDashboard(action) {
    try {
        const courseId = action.payload;
        let url = '/api/staff/dashboard';
        if (courseId && courseId !== 'ALL') {
            url += `?courseId=${courseId}`;
        }
        const response = yield call(axiosInstance.get, url);
        yield put(actions.fetchLecturerDashboardSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchLecturerDashboardFailure(
            error.response?.data?.message || error.message || 'Failed to fetch lecturer dashboard'
        ));
    }
}

function* handleFetchStaffAttendanceClass(action) {
    try {
        const { date, semester, year, section, branch } = action.payload || {};
        let url = '/api/staff/attendance/class';
        const params = [];
        if (date) params.push(`date=${date}`);
        if (semester) params.push(`semester=${semester}`);
        if (year) params.push(`year=${year}`);
        if (section) params.push(`section=${section}`);
        if (branch) params.push(`branch=${branch}`);
        if (params.length > 0) url += `?${params.join('&')}`;

        const response = yield call(axiosInstance.get, url);
        yield put(actions.fetchStaffAttendanceClassSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchStaffAttendanceClassFailure(
            error.response?.data?.message || error.message || 'Failed to fetch attendance class list'
        ));
    }
}

function* handleSubmitStaffAttendance(action) {
    try {
        const response = yield call(axiosInstance.post, '/api/staff/attendance/submit', action.payload);
        yield put(actions.submitStaffAttendanceSuccess(response.data));
        // Automatically refresh the current student attendance list to sync state
        const { recordDate, semester } = action.payload;
        yield put(actions.fetchStaffAttendanceClassRequest({ date: recordDate, semester }));
    } catch (error) {
        yield put(actions.submitStaffAttendanceFailure(
            error.response?.data?.message || error.message || 'Failed to submit attendance'
        ));
    }
}

function* handleFetchStaffAttendanceHistory(action) {
    try {
        const { limit = 30 } = action.payload || {};
        const response = yield call(axiosInstance.get, `/api/staff/attendance/history?limit=${limit}`);
        yield put(actions.fetchStaffAttendanceHistorySuccess(response.data));
    } catch (error) {
        yield put(actions.fetchStaffAttendanceHistoryFailure(
            error.response?.data?.message || error.message || 'Failed to fetch attendance history'
        ));
    }
}

export default function* dashboardSaga() {
    yield takeLatest(types.FETCH_PRINCIPAL_DASHBOARD_REQUEST, handleFetchDashboard);
    yield takeLatest(types.FETCH_STAFF_ATTENDANCE_GRAPH_REQUEST, handleFetchStaffAttendanceGraph);
    yield takeLatest(types.FETCH_YEARS_REQUEST, handleFetchYears);
    yield takeLatest(types.FETCH_SECTIONS_REQUEST, handleFetchSections);
    yield takeLatest(types.FETCH_ASSESSMENT_TYPES_REQUEST, handleFetchAssessmentTypes);
    yield takeLatest(types.FETCH_MARKS_DISTRIBUTION_REQUEST, handleFetchMarksDistribution);
    yield takeLatest(types.FETCH_ATTENDANCE_TRENDS_REQUEST, handleFetchAttendanceTrends);
    yield takeLatest(types.FETCH_DEPARTMENT_AVERAGES_REQUEST, handleFetchDepartmentAverages);
    yield takeLatest(types.FETCH_LEAST_PERFORMED_STAFF_REQUEST, handleFetchLeastPerformedStaff);
    yield takeLatest(types.FETCH_LECTURER_DASHBOARD_REQUEST, handleFetchLecturerDashboard);
    yield takeLatest(types.FETCH_STAFF_ATTENDANCE_CLASS_REQUEST, handleFetchStaffAttendanceClass);
    yield takeLatest(types.SUBMIT_STAFF_ATTENDANCE_REQUEST, handleSubmitStaffAttendance);
    yield takeLatest(types.FETCH_STAFF_ATTENDANCE_HISTORY_REQUEST, handleFetchStaffAttendanceHistory);
}
