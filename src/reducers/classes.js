/**
 * Early Childhood Development App
 * @copyright 2018 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Zayin Krige <zkrige@gmail.com>
 */

'use-strict'

import tree from '../store/tree'
import { REHYDRATE } from 'redux-persist/constants'

export default (state = tree.classes, action) => {
  switch (action.type) {
    case 'STORE_CLASSES': {
      let classes = action.payload
      if (!Array.isArray(classes)) {
        classes = []
      }
      return classes
    }
    case REHYDRATE: {
      let classes = action.payload
      if (!Array.isArray(classes)) {
        classes = []
      }
      return classes
    }
    default:
      return state || {}
  }
}
