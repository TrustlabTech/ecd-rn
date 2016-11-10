import {
  Dimensions,
  Platform
} from 'react-native'

export default {
  debug: true,
  version: "0.0.1",
  metrics: {
      systemBarHeight: Platform.OS === 'ios' ? 20 : 0,
      navBarHeight: (Platform.OS === 'ios') ? 60 : 60
  },
  http: {
    // baseUrl: 'http://ecd.cnsnt.io/api/v1/',

    baseUrl: 'http://128.199.57.211/api/v1/',
    // baseUrl: 'http://0a88e035.ngrok.io/api/v1/',
    headers: {
      'X-Client-Platform': 'Ecdrn ' + Platform.OS,
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
}