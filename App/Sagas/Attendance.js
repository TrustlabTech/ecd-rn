import { call, put } from 'redux-saga/effects'
import Api from '../Api'
import Config from '../Config'
import Routes from '../Routes'
import * as appActions from '../Actions/App'
import * as attendanceActions from '../Actions/Attendance'

export function* fetchClass(action) {
  try {
    yield put(appActions.setModal({modalVisible: true}))
    const data = yield call(Api.fetchClass, action.classId, action.token)
    if(data && !data.error) {
      yield put(appActions.setClass(data))
      yield put(appActions.setModal({modalVisible: false}))
    } else {
      yield put(appActions.setModal({modalText: data.error || "Unknown error", modalWaiting: false}))
    }
  } catch (error) {
    if(Config.debug) console.log("Sagas:fetchClasses ERROR",error)
    yield put(appActions.setModal({modalText: error, modalWaiting: false}))
  }
}

export function* submit(action) {
  const { classId, attendanceData, token } = action
  try {
    yield put(appActions.setModal({modalVisible: true, modalWaiting: true}))

    let data = yield call(Api.submitAttendance,classId,attendanceData, token)
    if(data && !data.error) {
      yield put(appActions.setModal({modalText: data.error, modalWaiting: false}))
    }
  } catch (error) {
    yield put(appActions.setModal({modalText: error, modalWaiting: false}))
  }
}