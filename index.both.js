/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import Config from './App/Config'
import {
  Navigator,
  BackAndroid,
  Text,
  View,
  DrawerLayoutAndroid
} from 'react-native'
import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import { Provider } from 'react-redux'
import Routes from './App/Routes'
import * as Reducers from './App/Reducers'
import App from './App/App'

import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge'

const store = createStore(
  combineReducers(Reducers),
)


store.subscribe(() => {
  if(Config.debug && Config.debugStore)
    console.log("REDUX STORE UPDATED",store.getState())
})

export default class Both extends Component {

  constructor(props) {
    super(props)
    this.state = { ...props }

    this.gaTrackers = {
      tracker1: new GoogleAnalyticsTracker('UA-12345-1')
    }

  }

  componentWillUnmount() {

    // surely you don't redefine the function to be removed?
    BackAndroid.removeEventListener('hardwareBackPress', () => {
      if(this.refs.navigator.getCurrentRoutes() > 1) {
        setTimeout( () => this.navigator.pop(), 0)
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
              <App
                dispatch={ store.dispatch }
                route={route}
                navigator={navigator}
              >
                  {React.createElement(
                    route.scene,
                    { route, navigator, dispatch: store.dispatch, gaTrackers: this.gaTrackers }
                  )}
              </App>
            )
          }}
          configureScene={ (route, routeStack ) => Config.sceneConfig }
        />
      </Provider>

    )
  }

}