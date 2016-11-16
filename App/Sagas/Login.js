import { call, put } from 'redux-saga/effects'
import Api from '../Api'
import Config from '../Config'
import Routes from '../Routes'

import { ModalMode } from '../Components/WaitModal'

import * as appActions from '../Actions/App'
import * as loginActions from '../Actions/Login'
import * as mainActions from '../Actions/Main'
import * as navigationActions from '../Actions/Navigation'

export function* attempt(action) {

  const { phoneNumber, pin, navigator } = action

  try {
    let data = yield call(Api.login,phoneNumber,pin)
    if(data.error) {
      yield put(appActions.setModal({modalText: data.error, modalVisible: true, modalMode: ModalMode.OKAY}))
    } else {
      yield put(navigationActions.push(Routes.main, navigator))
      yield put(appActions.setUser(data))
      yield put(appActions.setModal({modalVisible: false}))
    }

  } catch (error) {
    if(Config.debug) console.log("Sagas:loginAttempt ERROR",error)
    yield put(appActions.setModal({modalText: error, modalWaiting: false, modalVisible: true}))
  }
}