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

const pkg = require('../package.json')

export default {

  // Predefined error messages
  errorMessage: {
    NETWORK: 'Could not fetch data'
  },

  debug: true,          // Master switch
  debugAction: false,   // Redux actions
  debugNetwork: false,  // HTTP
  debugStore: false,    // Display each store change
  debugReact: false,    // Show react lifescylce data
  debugNavigator: true,
  // App version
  version: pkg.version,

  // React Native version
  rnVersion: pkg.dependencies['react-native'].substring(1),

  // Android navigator transitions
  sceneConfig: Navigator.SceneConfigs.PushFromRight,

  // Server details
  http: {
    baseUrl: 'http://ecd.cnsnt.io/api/v1/',
    headers: {
      'X-Client-Platform': 'ECDRN ' + Platform.OS + " " + pkg.version,
      'X-Requested-With': 'XMLHttpRequest'
    }
  },

  // Google Analytics
  googleAnalytics: {
    trackers: {
      tracker1: 'UA-88187232-1'
    },
    dispatchInterval: 120,
    dryRun: true
  }
}