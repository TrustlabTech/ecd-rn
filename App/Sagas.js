
import { takeEvery, delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import Api from './Api'
import Config from './Config'

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield takeEvery('LOGIN_ATTEMPT',loginAttempt)
}

function* loginAttempt(action) {
  const { phoneNumber, pin } = action
  try {
    const data = yield call(Api.login,phoneNumber,pin)
    if(data.error) {
      console.log("DATA",data.error)
      yield put({type: "LOGIN_FAILED", error: data.error.toString()})
    } else {
      yield put({type: "LOGIN_SUCCEEDED"})
    }
  } catch (error) {
    if(Config.debug) console.log("Sagas:loginAttempt ERROR",error)
    yield put({type: "LOGIN_FAILED"})
  }
}
