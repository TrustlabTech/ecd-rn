import {
  Dimensions,
  Platform,
  Navigator
} from 'react-native'

const pkg = require('../package.json')
export default {
  debug: true,
  debugState: false,
  debugNetwork: false,
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