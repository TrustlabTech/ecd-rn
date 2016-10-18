import {
  Dimensions,
  Platform
} from 'react-native'

const { width, height } = Dimensions.get('window')

export default {
  metrics: {
      systemBarHeight: Platform.OS === 'ios' ? 20 : 0,
      navBarHeight: (Platform.OS === 'ios') ? 60 : 60
  },
  httpClient: {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Client-Platform': 'Ecdrn ' + Platform.OS
    }
  }
}