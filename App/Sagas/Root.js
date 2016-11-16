import { takeLatest } from 'redux-saga'
import * as loginSagas from './Login'
import * as registerSagas from './Register'
import * as classSagas from './Class'
import * as attendanceSagas from './Attendance'

// single entry point to start all Sagas at once
export default function* rootSaga() {
    try {
        yield takeLatest('LOGIN_ATTEMPT',loginSagas.attempt)
        yield takeLatest('CLASS_FETCH_CLASSES',classSagas.fetchClasses)
        yield takeLatest('ATTENDANCE_FETCH_CLASS',attendanceSagas.fetchClass)
        yield takeLatest('ATTENDANCE_SUBMIT',attendanceSagas.submit)
    } catch(error) {
        console.log('SAGA ERROR',error)
    }
}



