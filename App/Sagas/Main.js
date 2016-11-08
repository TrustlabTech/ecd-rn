import { call, put } from 'redux-saga/effects'
import Api from '../Api'
import Config from '../Config'
import Routes from '../Routes'
import * as appActions from '../Actions/App'
import * as loginActions from '../Actions/Login'
// import * as navigationActions from '../Actions/Navigation'

// export function* fetchCentres(action) {

//   // const { phoneNumber, pin, navigator } = action
//   try {
//     let data = yield call(Api.fetchCentres, action.token)
//     if(data.error) {
//       console.log('SAGA DATA.ERROR')
//       yield put(appActions.setModal({modalText: data.error, modalWaiting: false}))
//     } else {
//       console.log('SAGA SUCCESS')
//     }
//   } catch (error) {
//     console.log('SAGA CATCH.ERROR')
//     if(Config.debug) console.log("Sagas:fetchCentres ERROR",error)
//     yield put(appActions.setModal({modalText: error, modalWaiting: false}))

//   }
// }

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