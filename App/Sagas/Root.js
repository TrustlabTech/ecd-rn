import { takeEvery } from 'redux-saga'
import * as loginSagas from './Login'
import * as registerSagas from './Register'

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield takeEvery('LOGIN_ATTEMPT',loginSagas.attempt)
    // yield takeEvery('REGISTER_ATTEMPT',registerAttempt)
    yield takeEvery('REGISTER_FETCH_CENTRES', registerSagas.fetchCentres)
    // yield takeEvery('ATTENDANCE_FETCH_CLASSES', fetchClasses)
}



