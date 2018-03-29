/**
 * Early Childhood Development App
 * @copyright 2018 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Zayin Krige <zkrige@gmail.com>
 */

'use-strict'

import tree from '../store/tree'
import { REHYDRATE } from 'redux-persist/constants'

export default (state = tree.pupils, action) => {
  switch (action.type) {
    case 'STORE_PUPILS': {
      let pupils = action.payload
      if (!Array.isArray(pupils)) {
        pupils = []
      }
      if (state.length > 0) {
        pupils = pupils.map(pupil => {
          const _pupil = state.find(e => e.id === pupil.id);
          if (_pupil && _pupil.attendanceTime) {
            pupil.attendanceTime = _pupil.attendanceTime
          }
          return pupil
        })
      }
      return pupils
    }
    case REHYDRATE: {
      let { pupils } = action.payload
      if (!Array.isArray(pupils)) {
        pupils = []
      }
      return pupils
    }
    case 'UPDATE_ATTENDANCE_TIME': 
      return updateAttendanceTime(state, action)
    default:
      return state || {}
  }
}
function updateAttendanceTime(state, action) {
  const timeStamp = new Date().getTime()
  const result = state.map(pupil => {
    const object = Object.assign({}, pupil);
    let _pupil = action.payload.find(e => e.id === object.id)
    if (_pupil) {
      object.attendanceTime = timeStamp
    }
    return object;
  });
  return result
}
