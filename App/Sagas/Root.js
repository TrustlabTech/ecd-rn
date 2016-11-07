import { takeEvery } from 'redux-saga'
import * as loginSagas from './Login'
import * as registerSagas from './Register'
import * as mainSagas from './Main'

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield takeEvery('LOGIN_ATTEMPT',loginSagas.attempt)
    yield takeEvery('MAIN_FETCH_CENTRES',mainSagas.fetchCentres)
    // yield takeEvery('REGISTER_ATTEMPT',registerAttempt)
    // yield takeEvery('REGISTER_FETCH_CENTRES', registerSagas.fetchCentres)
    // yield takeEvery('ATTENDANCE_FETCH_CLASSES', fetchClasses)
}



