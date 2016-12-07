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
import EventEmitter from 'EventEmitter'
import {
  GoogleAnalyticsTracker,
  GoogleAnalyticsSettings
} from 'react-native-google-analytics-bridge'

import Util from './App/Impulse/lib/Util'
import IMPLog from './App/Impulse/IMPLog'
import * as Lifecycle from './App/Impulse/lib/Lifecycle'
import LoadingModal from './App/Components/LoadingModal'

// Init the Redux store
const store = createStore(
  combineReducers(Reducers),
)

// Output state changes in debug mode
store.subscribe(() => {
  if(Config.debug && Config.debugStore)
    IMPLog.store(store.getState())
})

export default class Ecdrn extends Component {

  // The route navigator will be instantiated with
  _initialRoute = null

  // Global event emitters
  _navigationEventEmitter = null
  _modalEventEmitter = null

  // The name of this file
  _fileName = null

  // The name of this class
  _className = null

  gaTrackers = {}

  constructor(props) {
    super(props)
    this.state = {
      modal: {
        visible: false
      }
     }

    // Initialise values
    this._fileName = 'index.android.js'
    this._className = this.constructor.name
    this._navigationEventEmitter = new EventEmitter()
    this._modalEventEmitter = new EventEmitter()
    this._initAnalytics()
    this._initialRoute = Config.initialRoute

    this._modalEventEmitter.addListener('modal', this._setModal, this)

    if(Config.debug && Config.debugReact) {
      IMPLog.react(this._fileName,Lifecycle.CONSTRUCTOR)
    }
  }

  _initAnalytics = () => {
    this.gaTrackers = {
      tracker1: new GoogleAnalyticsTracker(Config.googleAnalytics.trackers.tracker1)
    }
    GoogleAnalyticsSettings.setDispatchInterval(Config.googleAnalytics.dispatchInterval)
    GoogleAnalyticsSettings.setDryRun(Config.googleAnalytics.dryRun)

  }

  componentWillUnmount() {
    if(Config.debug && Config.debugReact) {
      IMPLog.react(this._fileName,Lifecycle.COMPONENT_WILL_MOUNT)
    }
  }

  componentDidMount() {
    if(Config.debug && Config.debugReact) {
      IMPLog.react(this._fileName,Lifecycle.COMPONENT_DID_MOUNT)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(Config.debug && Config.debugReact) {
      IMPLog.react(this._fileName,Lifecycle.COMPONENT_WILL_RECEIEVE_PROPS)
    }
  }

  componentWillUpdate(nextProps, nextState) {
      if(Config.debug && Config.debugReact) {
        IMPLog.react(this._fileName,Lifecycle.COMPONENT_WILL_UPDATE)
      }
  }

  componentDidUpdate(nextProps, nextState) {
      if(Config.debug && Config.debugReact) {
        IMPLog.react(this._fileName,Lifecycle.COMPONENT_DID_UPDATE)
      }
  }

  componentWillUnmount() {
    if(Config.debug && Config.debugReact) {
        IMPLog.react(this._fileName,Lifecycle.COMPONENT_WILL_UNMOUNT)
    }
  }

  // Relay the event on to the scene
  _onWillFocus = route => {
    const eventSourceClass = Util.getClassFromDisplayName(route.scene.displayName)
    this._navigationEventEmitter.emit('onWillFocus'+eventSourceClass)
  }

  // Relay the event to the scene
  _onDidFocus = route => {
    const eventSourceClass = Util.getClassFromDisplayName(route.scene.displayName)
    this._navigationEventEmitter.emit('onDidFocus'+eventSourceClass)
  }

  _setModal = options => {
    this.setState({modal: options})
  }

  render() {
    if(Config.debug && Config.debugReact) {
      IMPLog.react(this._fileName,Lifecycle.RENDER)
    }
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
              <View style={{flex: 1}}>
              <LoadingModal
                visible={this.state.modal.visible}
                />
                <View style={{flex: 1}}>
                  {React.createElement(
                    route.scene,
                    {
                      modal: this._modal,
                      route,
                      navigator,
                      dispatch: store.dispatch,         // Let's us fire redux actions
                      gaTrackers: this.gaTrackers,      // Google Analytics
                      _navigationEventEmitter: this._navigationEventEmitter, // Navigator events
                      _modalEventEmitter: this._modalEventEmitter // LoadingModal events
                    }
                  )}
                </View>
              </View>
            )
          }}
          configureScene={ (route, routeStack ) => Config.sceneConfig }
        />
      </Provider>

    )
  }

}

AppRegistry.registerComponent('Ecdrn', () => Ecdrn)