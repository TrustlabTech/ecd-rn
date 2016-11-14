import { call, put } from 'redux-saga/effects'
import Api from '../Api'
import Config from '../Config'
import Routes from '../Routes'
import * as appActions from '../Actions/App'

export function* fetchClasses(action) {
  try {
    yield put(appActions.setModal({modalVisible: true}))
    const data = yield call(Api.fetchClasses, action.staffId, action.token)
    if(data && !data.error) {
      yield put(appActions.setCentre(data))
      yield put(appActions.setModal({modalVisible: false}))
    } else {
      yield put(appActions.setModal({modalText: data.error || "Unknown error", modalWaiting: false}))
    }
  } catch (error) {
    if(Config.debug) console.log("Sagas:fetchClasses ERROR",error)
    yield put(appActions.setModal({modalText: error, modalWaiting: false}))
  }
}