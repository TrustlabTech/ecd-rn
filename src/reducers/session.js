/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

'use-strict'

import tree from '../store/tree'
import { REHYDRATE } from 'redux-persist/constants'

export default (state = tree.session, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
      ...state,
      ...action.payload,
    }
    case REHYDRATE: {
      return {
      ...state,
      ...action.payload.session,
    }
  }
    default:
      return state || {}
  }
}
