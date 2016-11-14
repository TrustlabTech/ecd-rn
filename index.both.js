import React, { Component } from 'react'
import Config from './App/Config'
import {
  Navigator,
  BackAndroid,
  Text,
  View
} from 'react-native'
import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import Routes from './App/Routes'
import * as Reducers from './App/Reducers'
import rootSaga from './App/Sagas/Root'
import App from './App/App'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  combineReducers(Reducers),
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

store.subscribe(() => {
  if(Config.debug && Config.debugState)
    console.log("REDUX STORE UPDATED",store.getState())
})

export default class Both extends Component {

  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  componentWillMount() {

  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', () => {
      if(this.refs.navigator.getCurrentRoutes() > 1) {
        this.navigator.pop()
        return true
      } else {
        return false
      }
    })
  }

  render() {
    return (

      <Provider store={store}>
        <Navigator
          initialRoute={Routes.login}
          ref='navigator'
          renderScene={ (route, navigator) => {
            BackAndroid.addEventListener('hardwareBackPress', () => {
              if(navigator.getCurrentRoutes().length > 1) {
                navigator.pop()
                return true
              } else {
                return false
              }
            })
            return (
              <App dispatch={ store.dispatch }>
                {React.createElement(
                  route.scene,
                  { route, navigator, dispatch: store.dispatch }
                )}
              </App>
            )
          }}
          configureScene={ (route, routeStack ) =>
            Navigator.SceneConfigs.FloatFromRight
          }
        />
      </Provider>

    )
  }

}