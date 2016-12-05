/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import Config from './App/Config'
import {
  AppRegistry,
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

import Util from './App/Impulse/lib/Util'
import IMPLog from './App/Impulse/IMPLog'
import * as Lifecycle from './App/Impulse/lib/Lifecycle'
// Init the Redux store
const store = createStore(
  combineReducers(Reducers),
)

// Output state changes in debug mode
store.subscribe(() => {
  if(Config.debug && Config.debugStore)
    console.log("REDUX STORE UPDATED",store.getState())
})

export default class Ecdrn extends Component {

  // The route navigator will be instantiated with
  _initialRoute = null

  // Global event emitter
  _eventEmitter = null

  // The name of this file
  _fileName = null

  gaTrackers = {}

  constructor(props) {
    super(props)
    this.state = { ...props }

    // Initialise values
    this._fileName = this.constructor.name
    this._eventEmitter = new EventEmitter()
    this.initAnalytics()
    this._initialRoute = Config.initialRoute
    IMPLog.react(this._fileName,Lifecycle.CONSTRUCTOR)
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

  // Relay the event on to the scene
  _onWillFocus = route => {
    const eventSourceClass = Util.getClassFromDisplayName(route.scene.displayName)
    this._eventEmitter.emit('onWillFocus'+eventSourceClass)
  }

  // Relay the event to the scene
  _onDidFocus = route => {
    const eventSourceClass = Util.getClassFromDisplayName(route.scene.displayName)
    this._eventEmitter.emit('onDidFocus'+eventSourceClass)
  }


  render() {
    return (

      <Provider store={store}>
        <Navigator
          initialRoute={this._initialRoute}
          onWillFocus={this._onWillFocus}
          onDidFocus={this._onDidFocus}
          renderScene={ (route, navigator) => {



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
                      dispatch: store.dispatch,         // Let's us fire redux actions
                      gaTrackers: this.gaTrackers,      // Google Analytics
                      _eventEmitter: this._eventEmitter // So we can listen to events
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

AppRegistry.registerComponent('Ecdrn', () => Ecdrn)