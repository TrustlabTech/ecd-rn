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
  debug: true,
  debugAction: false,
  debugNetwork: true,
  debugStore: false,
  debugReact: false,
  version: pkg.version,
  rnVersion: pkg.dependencies['react-native'].substring(1),
  sceneConfig: Navigator.SceneConfigs.FadeAndroid,
  http: {
    baseUrl: 'http://ecd.cnsnt.io/api/v1/',
    headers: {
      'X-Client-Platform': 'Ecdrn ' + Platform.OS,
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
}