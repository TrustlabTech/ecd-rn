import { call, put } from 'redux-saga/effects'
import Api from '../Api'
import Config from '../Config'
import Routes from '../Routes'
import * as appActions from '../Actions/App'
import * as loginActions from '../Actions/Login'

export function* fetchCentres(action) {

  // const { phoneNumber, pin, navigator } = action
  try {
    let data = yield call(Api.fetchCentres, action.token)
    if(data.error) {
      console.log('SAGA DATA.ERROR')
      yield put(appActions.setModal({modalText: data.error, modalWaiting: false}))
    } else {
      console.log('SAGA SUCCESS')
    }
  } catch (error) {
    console.log('SAGA CATCH.ERROR')
    if(Config.debug) console.log("Sagas:loginAttempt ERROR",error)
    yield put(appActions.setModal({modalText: error, modalWaiting: false}))

  }
}