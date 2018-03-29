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
  let pupils = action.payload
  pupils = pupils.map(element => {
    element.attendanceTime = new Date().getTime()
    return element
  })
  const result = state.concat(pupils).unique()
  return result
}
Array.prototype.unique = function() {
  const a = this.concat();
  for (const i = 0; i < a.length; ++i) {
    for (const j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j])
        a.splice(j--, 1);
    }
  }
  return a;
};
