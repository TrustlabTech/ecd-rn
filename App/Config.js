import {
  Dimensions,
  Platform
} from 'react-native'

export default {
  debug: true,
  debugState: false,
  version: require('../package.json').version,
  metrics: {
      systemBarHeight: Platform.OS === 'ios' ? 20 : 0,
      navBarHeight: (Platform.OS === 'ios') ? 60 : 60
  },
  http: {
    baseUrl: 'http://ecd.cnsnt.io/api/v1/',
    headers: {
      'X-Client-Platform': 'Ecdrn ' + Platform.OS,
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
}