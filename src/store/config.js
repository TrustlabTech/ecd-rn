/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto@novalab.io>
 */

'use-strict'

/* base libs */
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import devTools from 'remote-redux-devtools'
import { createStore, applyMiddleware, compose } from 'redux'

// import tree from './tree'

export default function configureStore() {
  const enhancers = __DEV__ // eslint-disable-line no-undef
  ? compose(applyMiddleware(thunk), devTools({
    name: 'Ecd', realtime: true,
    hostname: 'localhost', port: 8082,
    maxAge: 30,
  }))
  : compose(applyMiddleware(thunk))
  
  const store = createStore(rootReducer, {}, enhancers)

  return store
}
