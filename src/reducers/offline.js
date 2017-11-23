/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 * @author Leonardo Lusoli <leonardo.lusoli@novalab.io>
 */

'use-strict'

import tree from '../store/tree'
import { REHYDRATE } from 'redux-persist/constants'

export default (state = tree.offline, action) => {
  switch (action.type) {
    case 'STORE_ATTENDANCE':
      return {
        ...state,
        attendances: [
          ...state.attendances,
          action.payload.attendance,
        ]
      }
    case 'REMOVE_ATTENDANCES':
      return {
        attendances: []
      }
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload.offline,
      }
    }
    default:
      return state || {}
  }
}
