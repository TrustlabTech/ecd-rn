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
    baseUrl: 'http://b19124ab.ngrok.io/api/v1/',
    // baseUrl: 'http://localhost:8000/api/v1/',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Client-Platform': 'Ecdrn ' + Platform.OS
    }
  }
}