import * as types from '../types/remarksTypes';

const initialState = {
    summary: {
        resolutionRate: 0,
        trendPercentage: 0,
        staffRemarksCount: 0,
        campusRemarksCount: 0,
    },
    summaryLoading: false,
    summaryError: null,

    feed: [],
    feedLoading: false,
    feedError: null,

    scope: 'campus',        // current active tab: 'campus' | 'staff'
    resolving: false,
    resolveError: null,
};

const remarksReducer = (state = initialState, action) => {
    switch (action.type) {
        // Summary
        case types.FETCH_REMARKS_SUMMARY_REQUEST:
            return { ...state, summaryLoading: true, summaryError: null };
        case types.FETCH_REMARKS_SUMMARY_SUCCESS:
            return { ...state, summaryLoading: false, summary: action.payload };
        case types.FETCH_REMARKS_SUMMARY_FAILURE:
            return { ...state, summaryLoading: false, summaryError: action.payload };

        // Feed
        case types.FETCH_REMARKS_FEED_REQUEST:
            return { ...state, feedLoading: true, feedError: null };
        case types.FETCH_REMARKS_FEED_SUCCESS:
            return { ...state, feedLoading: false, feed: action.payload };
        case types.FETCH_REMARKS_FEED_FAILURE:
            return { ...state, feedLoading: false, feedError: action.payload };

        // Scope toggle
        case types.SET_REMARKS_SCOPE:
            return { ...state, scope: action.payload };

        // Resolution
        case types.RESOLVE_REMARK_REQUEST:
            return { ...state, resolving: true, resolveError: null };
        case types.RESOLVE_REMARK_SUCCESS:
            return { ...state, resolving: false };
        case types.RESOLVE_REMARK_FAILURE:
            return { ...state, resolving: false, resolveError: action.payload };

        default:
            return state;
    }
};

export default remarksReducer;
