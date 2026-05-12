import { all, fork } from 'redux-saga/effects';
import { watchInstitutionSaga } from './institutionSaga';
import authSaga from './authSaga';
import dashboardSaga from './dashboardSaga';
import { studentWatcherSaga } from './studentSaga';
import remarksSaga from './remarksSaga';

export default function* rootSaga() {
  yield all([
    fork(watchInstitutionSaga),
    fork(authSaga),
    fork(dashboardSaga),
    fork(studentWatcherSaga),
    fork(remarksSaga),
  ]);
}
