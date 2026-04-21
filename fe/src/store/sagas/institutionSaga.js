import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../types/institutionTypes';
import * as actions from '../actions/institutionActions';

function* handleFetchInstitutions() {
  try {
    const response = yield call(fetch, '/api/institutions');
    if (!response.ok) {
      throw new Error('Failed to fetch institutions');
    }
    const data = yield call([response, response.json]);
    yield put(actions.getInstitutionsSuccess(data));
  } catch (error) {
    yield put(actions.getInstitutionsFailure(error.message));
  }
}

export function* watchInstitutionSaga() {
  yield takeLatest(types.GET_INSTITUTIONS_REQUEST, handleFetchInstitutions);
}
