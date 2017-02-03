/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import Config from './App/Config'
import {
  AppRegistry,
  Navigator,
  View,
  Dimensions
} from 'react-native'

import EventEmitter from 'EventEmitter'
import {
  GoogleAnalyticsTracker,
  GoogleAnalyticsSettings
} from 'react-native-google-analytics-bridge'
import { Colours } from './App/GlobalStyles'
import IMPLog from './App/Impulse/IMPLog'
import * as Lifecycle from './App/Impulse/lib/Lifecycle'
import LoadingModal from './App/Components/LoadingModal'

const PORTRAIT = 0
const LANDSCAPE = 1

/**
 * The root component of Ecdrn
 * @extends React.Component
 */
export default class Ecdrn extends Component {

  constructor (props) {
    super(props)

    /**
     * The route navigator will be instantiated with
     */
    this.initialRoute = null

    /**
     * Navigation event emitter
     */
    this._navigationEventEmitter = null

    /**
     * Modal event emitter
     */
    this._modalEventEmitter = null

    /**
     * The name of the file of the current Scene
     */
    this._fileName = null

    /**
     * The name of the class of the current Scene
     */
    this._className = null

    /**
     * An object to hold google analytics tracks
     */
    this._gaTrackers = {}

    this.state = {
      modal: {
        visible: false,
      },
      screenWidth: null,
      screenHeight: null
    }
    // Initialise values
    this._fileName = 'index.android.js'
    this._className = this.constructor.name
    this._navigationEventEmitter = new EventEmitter()
    this._modalEventEmitter = new EventEmitter()
    this._initAnalytics()
    this._initialRoute = Config.initialRoute

    this._modalEventEmitter.addListener('modal', this._setModal, this)

    if (Config.debug && Config.debugReact) {
      IMPLog.react(this._fileName, Lifecycle.CONSTRUCTOR)
    }
  }

  componentWillMount () {
    const initialDimensions = Dimensions.get('window')
    this.setState({
      screenWidth: Math.round(initialDimensions.width),
      screenHeight: Math.round(initialDimensions.height)
    })
    if (Config.debug && Config.debugReact) {
      IMPLog.react(this._fileName, Lifecycle.COMPONENT_WILL_MOUNT)
    }
  }

  /** Relay the event on to the scene */
  _onWillFocus = (route) => {
    this._navigationEventEmitter.emit('onWillFocus' + route.scene.name)
  }

  /** Relay the event to the scene */
  _onDidFocus = route => {
    this._navigationEventEmitter.emit('onDidFocus' + route.scene.name)
  }

  componentWillUnmount() {
    if (Config.debug && Config.debugReact) {
      IMPLog.react(this._fileName, Lifecycle.COMPONENT_WILL_UNMOUNT)
    }
  }

  componentDidMount() {
    if (Config.debug && Config.debugReact) {
      IMPLog.react(this._fileName, Lifecycle.COMPONENT_DID_MOUNT)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (Config.debug && Config.debugReact) {
      IMPLog.react(this._fileName, Lifecycle.COMPONENT_WILL_RECEIEVE_PROPS)
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (Config.debug && Config.debugReact) {
      IMPLog.react(this._fileName, Lifecycle.COMPONENT_WILL_UPDATE)
    }
  }

  componentDidUpdate(nextProps, nextState) {
    if (Config.debug && Config.debugReact) {
      IMPLog.react(this._fileName, Lifecycle.COMPONENT_DID_UPDATE)
    }
  }

  componentWillUnmount() {
    if (Config.debug && Config.debugReact) {
        IMPLog.react(this._fileName, Lifecycle.COMPONENT_WILL_UNMOUNT)
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.screenWidth !== this.state.screenWidth) {
      if (Config.debug) {
        if (nextState.screenWidth > nextState.screenHeight) {
          console.log('LANDSCAPE')
        } else {
          console.log('PORTRAIT')
        }
      }
      return true
    }

    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      return true
    }

    if (JSON.stringify(this.state) !== JSON.stringify(nextState)) {
      return true
    }
    return false
  }

  /**
   * Initialise google analytics
   * @returns {undefined}
   */
  _initAnalytics = () => {
    this._gaTrackers = {
      tracker1: new GoogleAnalyticsTracker(Config.googleAnalytics.trackers.tracker1)
    }
    this._gaTrackers.tracker1.setAppName(Config.appName + ' v' + Config.version)
    this._gaTrackers.tracker1.setAnonymizeIp(Config.googleAnalytics.anonymizeIp)
    this._gaTrackers.tracker1.setSamplingRate(Config.googleAnalytics.samplingRate)

    GoogleAnalyticsSettings.setDispatchInterval(Config.googleAnalytics.dispatchInterval)
    GoogleAnalyticsSettings.setDryRun(Config.debug)
    GoogleAnalyticsSettings.setOptOut(Config.googleAnalytics.optOut)

  }


  _onLayout = event => {
    this.updateDimensions(event.nativeEvent.layout)
  }

  updateDimensions (event) {
    this.setState({
      screenWidth: Math.round(event.width),
      screenHeight: Math.round(event.height),
      screenOrientation: event.width > event.height ? LANDSCAPE : PORTRAIT
    })
  }

  /** Set the modal's state */
  _setModal = options => {
    this.setState({modal: options})
  }

  render () {
    if (Config.debug && Config.debugReact) {
      IMPLog.react(this._fileName, Lifecycle.RENDER)
    }
    return (
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
              <View style={{flex: 1, backgroundColor: Colours.sceneBackgroundColour}}>
              <LoadingModal
                visible={this.state.modal.visible}
              />
                <View onLayout={this._onLayout} style={{flex: 1, backgroundColor: Colours.sceneBackgroundColour}}>
                  {React.createElement(
                    route.scene,
                    {
                      screenWidth: this.state.screenWidth,
                      screenHeight: this.state.screenHeight,
                      screenOrientation: this.state.screenOrientation,
                      route,
                      navigator,
                      _gaTrackers: this._gaTrackers,  // Google Analytics
                      _navigationEventEmitter: this._navigationEventEmitter, // Navigator events
                      _modalEventEmitter: this._modalEventEmitter // LoadingModal events
                    }
                  )}
                </View>
              </View>
            )
          }}
          configureScene={ (route, routeStack ) =>
            ({
              ...Config.sceneConfig,
              gestures: {}} // Prevents the user from being able to swipe to go back
            )}
        />
    )
  }
}

AppRegistry.registerComponent('Ecdrn', () => Ecdrn)
