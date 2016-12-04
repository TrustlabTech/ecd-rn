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
import EventEmitter from 'EventEmitter'
import {
  GoogleAnalyticsTracker,
  GoogleAnalyticsSettings
} from 'react-native-google-analytics-bridge'

// Init the Redux store
const store = createStore(
  combineReducers(Reducers),
)

// Output state changes in debug mode
store.subscribe(() => {
  if(Config.debug && Config.debugStore)
    console.log("REDUX STORE UPDATED",store.getState())
})

export default class Both extends Component {

  _currentRoute = null
  _previousRoute = null

  gaTrackers = {}
  _eventEmitter = null

  constructor(props) {
    super(props)
    this.state = { ...props }
    this._eventEmitter = new EventEmitter()
    this.initAnalytics()
    this._currentRoute = Config.initialRoute
  }

  initAnalytics = () => {
    this.gaTrackers = {
      tracker1: new GoogleAnalyticsTracker(Config.googleAnalytics.trackers.tracker1)
    }
    GoogleAnalyticsSettings.setDispatchInterval(Config.googleAnalytics.dispatchInterval)
    GoogleAnalyticsSettings.setDryRun(Config.googleAnalytics.dryRun)

  }

  componentWillUnmount() {
    if(Config.debug && Config.debugReact) {
      console.log(this.FILENAME, 'componentWillUnmount')
    }
  }

  getClassFromDisplayName = displayName => {
    if(displayName) {
      if(displayName.contains("Connect")) {
        // This component is connected to redux

        return displayName.substring(
          displayName.indexOf("(")+1,
          displayName.indexOf(")"))
      } else {
        // This component is not connected to redux
        return displayName
      }
    } else {
      throw "Could not parse displayName"
    }
  }

  _setCurrentRoute(route) {
    this._previousRoute = this._currentRoute
    this._currentRoute = route
  }

  _onWillFocus = route => {
    // console.log(route)
    const eventSourceClass = this.getClassFromDisplayName(route.scene.displayName)


    this._eventEmitter.emit('onWillFocus'+eventSourceClass)
    console.log('emitted******* onWillFocus'+eventSourceClass)
  }

  _onDidFocus = route => {
    // const className = this.getClassFromDisplayName(route.scene.displayName)
    // this._eventEmitter.emit('onDidFocus'+className,)
  }


  render() {
    return (

      <Provider store={store}>
        <Navigator
          initialRoute={Routes.login}
          onWillFocus={this._onWillFocus}
          onDidFocus={this._onDidFocus}
          renderScene={ (route, navigator) => {

            this._setCurrentRoute(route)

            if(Config.debug && Config.debugNavigator) {
              console.log("--- ROUTES STACK ---")
              console.log(navigator.getCurrentRoutes())
              console.log("--- END ROUTES STACK ---")
            }

            return (
              <App
                dispatch={ store.dispatch }
                route={route}
                navigator={navigator}
              >
                  {React.createElement(
                    route.scene,
                    {
                      route,
                      navigator,
                      dispatch: store.dispatch,
                      gaTrackers: this.gaTrackers,
                      _eventEmitter: this._eventEmitter
                    }
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