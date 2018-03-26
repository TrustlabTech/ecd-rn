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
      let pupils = action.payload
      if (!Array.isArray(pupils)) {
        pupils = []
      }
      return pupils
    }
    default:
      return state || {}
  }
}
