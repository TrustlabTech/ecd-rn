// import { call, put } from 'redux-saga/effects'
// import { Alert } from 'react-native'
// import Api from '../Api'
// import Config from '../Config'
// import Routes from '../Routes'
// import * as appActions from '../Actions/App'
// import * as navigationActions from '../Actions/Navigation'

// import { ModalMode } from '../Components/WaitModal'

// export function* fetchClass(action) {
//   try {
//     yield put(appActions.setModal({modalVisible: true, modalMode: ModalMode.WAITING}))
//     const data = yield call(Api.fetchClass, action.classId, action.token)
//     if(data && !data.error) {
//       yield put(appActions.setClass(data))
//       yield put(appActions.setModal({modalVisible: false}))
//     } else {
//       yield put(appActions.setModal({modalText: data.error || "Unknown error"}))
//     }
//   } catch (error) {
//     if(Config.debug) console.log("Sagas:fetchClass ERROR",error)
//     yield put(appActions.setModal({modalText: error, modalVisible: true, modalMode: ModalMode.OKAY}))
//   }
// }

// export function* submit(action) {
//   const { location, centreId, classId, attendanceData, token, navigator } = action
//   try {

//     const data = yield call(Api.submitAttendance, location, centreId, classId,attendanceData, token)
//     if(data && !data.error) {
//       setTimeout(() => Alert.alert('Done', 'Complete',
//         [
//           {'text': 'Okay'}
//         ]
//       ))
//       yield put(appActions.setModal({
//         modalVisible: false
//       }))

//       // Clear classData from app state (avoid premature renders)
//       yield put(appActions.setClass(null))
//     } else {
//       yield put(appActions.setModal({
//         modalText: data.error,
//         modalMode: ModalMode.OKAY,
//         modalVisible: true,
//         modalOnPositive: () => {
//           put(appActions.setModal({modalVisible: false}))
//         }
//       }))
//     }
//   } catch (error) {
//     yield put(appActions.setModal({modalText: error, modalMode: ModalMode.OKAY, modalVisible: true}))
//   }
// }