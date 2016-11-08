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
    baseUrl: 'http://bae51946.ngrok.io/api/v1/',
    // baseUrl: 'http://localhost:8000/api/v1/',
    headers: {
      'X-Client-Platform': 'Ecdrn ' + Platform.OS,
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
}