/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import {
  Dimensions,
  Platform,
  Navigator
} from 'react-native'
import Routes from './Routes'
import { Colours } from './GlobalStyles'

const pkg = require('../package.json')

/** The configuration file for the App */
export default {
  // The full name of the application
  appName: 'ECD APP',
  // First scene to show
  initialRoute: Routes.login,

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

  debug: true,          // Master switch
  debugAction: false,   // Redux actions
  debugNetwork: true,   // HTTP
  debugReact: true,     // Show react lifescylce data
  debugNavigator: false,
  // App version
  version: pkg.version,

  // React Native version
  rnVersion: pkg.dependencies['react-native'].substring(1),

  // Android navigator transitions
  sceneConfig: Navigator.SceneConfigs.FadeAndroid,

  // Modal settings
  progressBarColor: Colours.consentOrange,

  // Server details
  http: {
    // baseUrl: 'http://ecd.cnsnt.io/api/v1/',
    baseUrl: 'http://172.16.20.125:8080/api/v1/',
    // baseUrl: 'http://staging.ecd.cnsnt.io/api/v1/',
    headers: {
      'X-Client-Platform': 'ECD ' + Platform.OS + ' v' + pkg.version,
      'X-Client-Version': pkg.version,
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