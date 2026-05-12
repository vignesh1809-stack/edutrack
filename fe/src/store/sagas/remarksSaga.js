import { takeLatest, put, call, select } from 'redux-saga/effects';
import * as types from '../types/remarksTypes';
import * as actions from '../actions/remarksActions';
import { fetchPrincipalDashboardRequest } from '../actions/dashboardActions';
import axiosInstance from '../../api/axiosInstance';

const normalizeFilters = (filters = {}) => {
    const normalized = {};

    if (filters.year && filters.year !== 'All Years') {
        normalized.year = filters.year;
    }
    if (filters.section && filters.section !== 'All Sections') {
        normalized.section = filters.section;
    }

    return normalized;
};

const toQueryString = (params = {}) => {
    const queryParams = new URLSearchParams(params);
    return queryParams.toString();
};

function* handleFetchRemarksSummary() {
    try {
        const filters = yield select((state) => state.dashboard.filters);
        const query = toQueryString(normalizeFilters(filters));
        const url = query
            ? `/api/principal/remarks/dashboard-summary?${query}`
            : '/api/principal/remarks/dashboard-summary';
        const response = yield call(axiosInstance.get, url);
        yield put(actions.fetchRemarksSummarySuccess(response.data));
    } catch (error) {
        yield put(actions.fetchRemarksSummaryFailure(error.message));
    }
}

function* handleFetchRemarksFeed(action) {
    try {
        const scopeValue =
            typeof action.payload === 'string' ? action.payload : action.payload?.scope;
        const scope = scopeValue === 'staff' ? 'STAFF' : 'CAMPUS';

        const dashboardFilters = yield select((state) => state.dashboard.filters);
        const filters =
            typeof action.payload === 'object' && action.payload?.filters
                ? action.payload.filters
                : dashboardFilters;

        const query = toQueryString({
            scope,
            ...normalizeFilters(filters),
        });
        const response = yield call(axiosInstance.get, `/api/principal/remarks/feed?${query}`);
        yield put(actions.fetchRemarksFeedSuccess(response.data?.content || []));
    } catch (error) {
        yield put(actions.fetchRemarksFeedFailure(error.message));
    }
}

function* handleResolveRemark(action) {
    try {
        const { remarkId, resolveForm } = action.payload;
        yield call(axiosInstance.post, `/api/principal/remarks/${remarkId}/resolve`, resolveForm);
        yield put(actions.resolveRemarkSuccess({ remarkId }));

        // After resolving, refresh both the summary and the current feed
        const scope = yield select((state) => state.remarks.scope);
        const filters = yield select((state) => state.dashboard.filters);
        yield put(actions.fetchRemarksSummaryRequest({ filters }));
        yield put(actions.fetchRemarksFeedRequest({ scope, filters }));
        yield put(fetchPrincipalDashboardRequest(filters));
    } catch (error) {
        yield put(actions.resolveRemarkFailure(error.message));
    }
}

export default function* remarksSaga() {
    yield takeLatest(types.FETCH_REMARKS_SUMMARY_REQUEST, handleFetchRemarksSummary);
    yield takeLatest(types.FETCH_REMARKS_FEED_REQUEST, handleFetchRemarksFeed);
    yield takeLatest(types.RESOLVE_REMARK_REQUEST, handleResolveRemark);
}
