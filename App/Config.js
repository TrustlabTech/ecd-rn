/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import {
  Platform,
  Navigator
} from 'react-native'
import Routes from './Routes'
import { Colours } from './GlobalStyles'

const PKG = require('../package.json')
const RUNTIME = require('../cfg/runtime.json')

/** The configuration file for the App */
export default {

  // The full name of the application
  appName: 'ECD APP',

  // First scene to show
  initialRoute: Routes.login,

  // Debug settings
  debug: RUNTIME.DEBUG.MASTER,         // Main switch
  debugNetwork: RUNTIME.DEBUG.NETWORK,   // HTTP
  debugReact: RUNTIME.DEBUG.REACT,     // Show react lifescylce data
  debugNavigator: RUNTIME.DEBUG.NAVIGATOR,
  debugAutoLogin: RUNTIME.DEBUG.AUTO_LOGIN,

  // Predefined error messages
  errorMessage: {
    login: {
      title: 'Invalid login',
      message: ''
    },
    network: {
      title: 'Network Error',
      message: 'Could not connect to server. Please ensure you are connected to the internet'
    }
  },

  // App version
  version: PKG.version,

  // React Native version
  rnVersion: PKG.dependencies['react-native'].substring(1),

  // Android navigator transitions
  sceneConfig: Navigator.SceneConfigs.FloatFromRight,
  sceneTransitionMinumumTime: 200,

  // Modal settings
  progressBarColor: Colours.consentOrange,

  // Server details
  http: {
    server: RUNTIME.SERVER,
    baseUrl: RUNTIME.SERVER + '/api/v' + RUNTIME.API_VERSION + '/',
    headers: {
      'X-Client-Platform': 'ECD ' + Platform.OS + ' v' + PKG.version,
      'X-Client-Server': RUNTIME.SERVER,
      'X-Client-Version': PKG.version,
      'X-Requested-With': 'XMLHttpRequest'
    }
  },

  // Google Analytics
  googleAnalytics: {
    trackers: {
      tracker1: 'UA-88187232-1'
    },
    dispatchInterval: 120,
    samplingRate: 50,
    anonymizeIp: false,
    optOut: false
  }
}

