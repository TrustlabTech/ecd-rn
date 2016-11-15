import {
  Dimensions,
  Platform,
  Navigator
} from 'react-native'

export default {
  debug: true,
  debugState: false,
  debugNetwork: false,
  version: require('../package.json').version,
  sceneConfig: Navigator.SceneConfigs.FadeAndroid,
  http: {
    baseUrl: 'http://ecd.cnsnt.io/api/v1/',
    headers: {
      'X-Client-Platform': 'Ecdrn ' + Platform.OS,
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
}