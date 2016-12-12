/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */

import {
  Dimensions,
  Platform,
  Navigator
} from 'react-native'
import Routes from './Routes'
import { Colours } from './GlobalStyles'

const pkg = require('../package.json')

export default {
  // Full name of the application
  appName: 'ECD APP',

  // First scene to show
  initialRoute: Routes.login,

  // Predefined error messages
  errorMessage: {
    NETWORK: 'Could not fetch data'
  },

  debug: false,          // Master switch
  debugAction: false,   // Redux actions
  debugNetwork: false,   // HTTP
  debugReact: false,     // Show react lifescylce data
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
    baseUrl: 'http://ecd.cnsnt.io/api/v1/',
    headers: {
      'X-Client-Platform': 'ECD ' + Platform.OS + ' v' + pkg.version,
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