import { takeLatest, put, call, select } from 'redux-saga/effects';
import * as types from '../types/remarksTypes';
import * as actions from '../actions/remarksActions';
import axiosInstance from '../../api/axiosInstance';

function* handleFetchRemarksSummary() {
    try {
        const response = yield call(axiosInstance.get, '/api/principal/remarks/dashboard-summary');
        yield put(actions.fetchRemarksSummarySuccess(response.data));
    } catch (error) {
        yield put(actions.fetchRemarksSummaryFailure(error.message));
    }
}

function* handleFetchRemarksFeed(action) {
    try {
        const scope = action.payload === 'campus' ? 'CAMPUS' : 'STAFF';
        const response = yield call(axiosInstance.get, `/api/principal/remarks/feed?scope=${scope}`);
        yield put(actions.fetchRemarksFeedSuccess(response.data?.content || []));
    } catch (error) {
        yield put(actions.fetchRemarksFeedFailure(error.message));
    }
}

function* handleResolveRemark(action) {
    try {
        const { remarkId, resolveForm } = action.payload;
        yield call(axiosInstance.post, `/api/principal/remarks/${remarkId}/resolve`, resolveForm);
        yield put(actions.resolveRemarkSuccess());

        // After resolving, refresh both the summary and the current feed
        const scope = yield select((state) => state.remarks.scope);
        yield put(actions.fetchRemarksSummaryRequest());
        yield put(actions.fetchRemarksFeedRequest(scope));
    } catch (error) {
        yield put(actions.resolveRemarkFailure(error.message));
    }
}

export default function* remarksSaga() {
    yield takeLatest(types.FETCH_REMARKS_SUMMARY_REQUEST, handleFetchRemarksSummary);
    yield takeLatest(types.FETCH_REMARKS_FEED_REQUEST, handleFetchRemarksFeed);
    yield takeLatest(types.RESOLVE_REMARK_REQUEST, handleResolveRemark);
}
