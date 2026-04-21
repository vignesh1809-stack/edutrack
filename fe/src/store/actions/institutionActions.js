import * as types from '../types/institutionTypes';

export const getInstitutionsRequest = () => ({
  type: types.GET_INSTITUTIONS_REQUEST,
});

export const getInstitutionsSuccess = (institutions) => ({
  type: types.GET_INSTITUTIONS_SUCCESS,
  payload: institutions,
});

export const getInstitutionsFailure = (error) => ({
  type: types.GET_INSTITUTIONS_FAILURE,
  payload: error,
});
