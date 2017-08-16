/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

'use-strict'

/* base libs */
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { AsyncStorage } from 'react-native'
import devTools from 'remote-redux-devtools'
import { persistStore, autoRehydrate } from 'redux-persist'
import { createStore, applyMiddleware, compose } from 'redux'

export default function configureStore(onComplete) {
  const enhancers = __DEV__ // eslint-disable-line no-undef
  ? compose(applyMiddleware(thunk), devTools({
    name: 'Ecd', realtime: true,
    hostname: 'localhost', port: 8082,
    maxAge: 30,
  }))
  : compose(applyMiddleware(thunk), autoRehydrate)
  
  const store = createStore(rootReducer, undefined, enhancers)

  persistStore(store, { blacklist: ['api'], storage: AsyncStorage }, onComplete)

  return store
}
