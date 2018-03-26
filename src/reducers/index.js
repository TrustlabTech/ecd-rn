/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 * @author Zayin Krige <zkrige@gmail.com>
 */

'use-strict'

/* base libs */
import { combineReducers } from 'redux'
/* functions/utils */
import session from './session'
import offline from './offline'
import pupils from './pupils'
import classes from './classes'

const rootReducer = combineReducers({
  session,
  offline,
  pupils,
  classes,
})

export default rootReducer
