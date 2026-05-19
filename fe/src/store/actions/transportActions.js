import * as types from '../types/transportTypes';

export const fetchTransportDashboardRequest = () => ({ type: types.FETCH_TRANSPORT_DASHBOARD_REQUEST });
export const fetchTransportDashboardSuccess = (payload) => ({ type: types.FETCH_TRANSPORT_DASHBOARD_SUCCESS, payload });
export const fetchTransportDashboardFailure = (error) => ({ type: types.FETCH_TRANSPORT_DASHBOARD_FAILURE, error });

export const fetchTransportOnDutyRequest = () => ({ type: types.FETCH_TRANSPORT_ON_DUTY_REQUEST });
export const fetchTransportOnDutySuccess = (payload) => ({ type: types.FETCH_TRANSPORT_ON_DUTY_SUCCESS, payload });
export const fetchTransportOnDutyFailure = (error) => ({ type: types.FETCH_TRANSPORT_ON_DUTY_FAILURE, error });

export const fetchTransportStaffRequest = () => ({ type: types.FETCH_TRANSPORT_STAFF_REQUEST });
export const fetchTransportStaffSuccess = (payload) => ({ type: types.FETCH_TRANSPORT_STAFF_SUCCESS, payload });
export const fetchTransportStaffFailure = (error) => ({ type: types.FETCH_TRANSPORT_STAFF_FAILURE, error });

export const toggleStaffStatusRequest = (staffId) => ({ type: types.TOGGLE_STAFF_STATUS_REQUEST, payload: staffId });
export const toggleStaffStatusSuccess = (staffId) => ({ type: types.TOGGLE_STAFF_STATUS_SUCCESS, payload: staffId });
export const toggleStaffStatusFailure = (error) => ({ type: types.TOGGLE_STAFF_STATUS_FAILURE, error });

export const fetchTransportRoutesRequest = () => ({ type: types.FETCH_TRANSPORT_ROUTES_REQUEST });
export const fetchTransportRoutesSuccess = (payload) => ({ type: types.FETCH_TRANSPORT_ROUTES_SUCCESS, payload });
export const fetchTransportRoutesFailure = (error) => ({ type: types.FETCH_TRANSPORT_ROUTES_FAILURE, error });
