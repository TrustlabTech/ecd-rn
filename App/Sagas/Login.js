import { call, put } from 'redux-saga/effects'
import Api from '../Api'
import Config from '../Config'
import Routes from '../Routes'

import { ModalMode } from '../Components/WaitModal'

import * as appActions from '../Actions/App'
import * as loginActions from '../Actions/Login'
import * as mainActions from '../Actions/Main'

export function* attempt(action) {

  const { phoneNumber, pin, navigator } = action

  try {

    let data = yield call(Api.login,phoneNumber,pin)
    // yield put(appActions.setModal({
    //   modalVisible: true,
    //   modalText: "Please wait",
    //   modalMode: ModalMode.WAITING
    // }))
    if(data.error) {
      console.log('LOGIN SAGA DATA.ERROR')
      yield put(loginActions.failed(data.error.toString()))
      yield put(appActions.setModal({modalText: data.error, modalMode: ModalMode.OKAY}))
    } else {
      console.log('SAGA SUCCESS')
      yield put(loginActions.succeeded(navigator))
      yield put(appActions.setUser(data))
      yield put(appActions.setModal({modalVisible: false}))

      // yield put(mainActions.fetchCentres(data._token))
    }
  } catch (error) {
    console.log('SAGA CATCH.ERROR')
    if(Config.debug) console.log("Sagas:loginAttempt ERROR",error)
    yield put(appActions.setModal({modalText: error, modalWaiting: false}))

  }
}