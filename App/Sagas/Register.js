import { call, put } from 'redux-saga/effects'
import Api from '../Api'
import Config from '../Config'
import * as appActions from '../Actions/App'
import * as registerActions from '../Actions/Register'

export function* fetchCentres() {
  
  try {
    const data = yield call(Api.fetchCentres)

    if(data.error) {
      yield put(registerActions.fetchCentresFailed(data.error.toString()))
      yield put(appActions.setModal({modalText: data.error, modalWaiting: false}))
    } else {
      yield put(registerActions.fetchCentresSucceeded(data))
    }
  } catch (error) {
    if(Config.debug) console.log("Sagas:registerFetchCentres ERROR", error)
    yield put(registerActions.fetchCentresFailed(error.toString()))
    yield put(appActions.setModal({modalText: data.error, modalWaiting: false}))
  }
}