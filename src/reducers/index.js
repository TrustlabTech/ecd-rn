/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto@novalab.io>
 */

'use-strict'

/* base libs */
import { combineReducers } from 'redux'
/* functions/utils */
import user from './user'

const rootReducer = combineReducers({
  user,
})

export default rootReducer
