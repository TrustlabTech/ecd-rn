
import { takeEvery, delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import Api from './Api'
import Config from './Config'
import * as loginActions from './Actions/Login'
import * as registerActions from './Actions/Register'

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield takeEvery('LOGIN_ATTEMPT',loginAttempt)
    yield takeEvery('REGISTER_ATTEMPT',registerAttempt)
    yield takeEvery('REGISTER_FETCH_CENTRES', registerFetchCentres)
}

function* loginAttempt(action) {
  const { phoneNumber, pin } = action
  try {
    const data = yield call(Api.login,phoneNumber,pin)
    if(data.error) {
      yield put(loginActions.failed(data.error.toString()))
    } else {
      yield put(loginActions.succeeded(action.navigator))
    }
  } catch (error) {
    if(Config.debug) console.log("Sagas:loginAttempt ERROR",error)
    yield put(loginActions.failed(error.toString()))

  }
}

function* registerAttempt(action) {
  const { phoneNumber, pin, pinConfirm, firstName, lastName} = action
  try {
    const data = yield call(Api.register,action.textFieldValues)

    if(data.error) {
      yield put(registerActions.failed(data.error.toString()))
    } else {
      yield put(registerActions.succeeded(action.navigator))
    }
  } catch (error) {
    if(Config.debug) console.log("Sagas:registerAttempt ERROR", error)
    yield put(registerActions.failed(error.toString()))
  }
}

function* registerFetchCentres() {
  try {
    const data = yield call(Api.fetchCentres)

    if(data.error) {
      yield put(registerActions.fetchCentresFailed(data.error.toString()))
    } else {
      yield put(registerActions.fetchCentresSucceeded(data))
    }
  } catch (error) {
    if(Config.debug) console.log("Sagas:registerFetchCentres ERROR", error)
    yield put(registerActions.fetchCentresFailed(error.toString()))
  }
}