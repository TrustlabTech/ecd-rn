import {
  Dimensions,
  Platform
} from 'react-native'

export default {
  debug: true,
  metrics: {
      systemBarHeight: Platform.OS === 'ios' ? 20 : 0,
      navBarHeight: (Platform.OS === 'ios') ? 60 : 60
  },

  http: {
    baseUrl: 'http://1a2c3925.ngrok.io/api/v1/',
    // baseUrl: 'http://localhost:8000/api/v1/',
    headers: {
      'X-Client-Platform': 'Ecdrn ' + Platform.OS
    }
  }
}