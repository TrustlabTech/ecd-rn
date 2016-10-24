import {
  Dimensions,
  Platform
} from 'react-native'

export default {
  metrics: {
      systemBarHeight: Platform.OS === 'ios' ? 20 : 0,
      navBarHeight: (Platform.OS === 'ios') ? 60 : 60
  },

  http: {
    baseUrl: 'http://d6df94c3.ngrok.io/',
    // baseUrl: 'http://localhost:8989/',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Client-Platform': 'Ecdrn ' + Platform.OS
    }
  }
}