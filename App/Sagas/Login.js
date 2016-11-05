import { call, put } from 'redux-saga/effects'
import Api from '../Api'
import Config from '../Config'
import Routes from '../Routes'
import * as appActions from '../Actions/App'
import * as loginActions from '../Actions/Login'

export function* attempt(action) {

  const { phoneNumber, pin, navigator } = action
  try {
    let data = yield call(Api.login,phoneNumber,pin)
    if(data.error) {
      yield put(loginActions.failed(data.error.toString()))
      yield put(appActions.setModal({modalText: data.error, modalWaiting: false}))
    } else {
      yield put(loginActions.succeeded(navigator))
      yield put(appActions.setUser(data))
    }
  } catch (error) {
    if(Config.debug) console.log("Sagas:loginAttempt ERROR",error)
    yield put(appActions.setModal({modalText: error, modalWaiting: false}))

  }
}