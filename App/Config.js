/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */

/* Config.js
 * Contain's the application's configuration information
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

  debug: true,        // Master switch
  debugAction: false, // Redux actions
  debugNetwork: true, // HTTP
  debugStore: false,  // Display each store change
  debugReact: true,   // Show react lifescylce data

  // App version
  version: pkg.version,

  // React Native version
  rnVersion: pkg.dependencies['react-native'].substring(1),

  // Android navigator transitions
  sceneConfig: Navigator.SceneConfigs.FadeAndroid,

  // Server details
  http: {
    baseUrl: 'http://ecd.cnsnt.io/api/v1/',
    headers: {
      'X-Client-Platform': 'ECDRN ' + Platform.OS + " " + pkg.version,
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
}