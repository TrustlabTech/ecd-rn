import { call, put } from 'redux-saga/effects'
import Api from '../Api'
import Config from '../Config'
import Routes from '../Routes'
import * as appActions from '../Actions/App'
import * as loginActions from '../Actions/Login'
import * as navigationActions from '../Actions/Navigation'

export function* push(action) {
  try {
    yield(put(navigationActions.doPush(action.route,action.navigator)))
  } catch (error) {
    yield put(appActions.setModal({modalVisible: true, modalText: error, modalWaiting: false}))
  }
}