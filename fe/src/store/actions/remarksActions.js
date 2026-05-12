import * as types from '../types/remarksTypes';

export const fetchRemarksSummaryRequest = (payload = {}) => ({
    type: types.FETCH_REMARKS_SUMMARY_REQUEST,
    payload,
});
export const fetchRemarksSummarySuccess = (data) => ({
    type: types.FETCH_REMARKS_SUMMARY_SUCCESS,
    payload: data,
});
export const fetchRemarksSummaryFailure = (error) => ({
    type: types.FETCH_REMARKS_SUMMARY_FAILURE,
    payload: error,
});

export const fetchRemarksFeedRequest = (payload) => ({
    type: types.FETCH_REMARKS_FEED_REQUEST,
    payload,
});
export const fetchRemarksFeedSuccess = (data) => ({
    type: types.FETCH_REMARKS_FEED_SUCCESS,
    payload: data,
});
export const fetchRemarksFeedFailure = (error) => ({
    type: types.FETCH_REMARKS_FEED_FAILURE,
    payload: error,
});

export const resolveRemarkRequest = (remarkId, resolveForm) => ({
    type: types.RESOLVE_REMARK_REQUEST,
    payload: { remarkId, resolveForm },
});
export const resolveRemarkSuccess = (payload) => ({
    type: types.RESOLVE_REMARK_SUCCESS,
    payload,
});
export const resolveRemarkFailure = (error) => ({
    type: types.RESOLVE_REMARK_FAILURE,
    payload: error,
});

export const setRemarksScope = (scope) => ({
    type: types.SET_REMARKS_SCOPE,
    payload: scope,
});
