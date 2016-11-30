import Config from '../Config'
import Routes from '../Routes'

const initialState = {
  phoneNumber: '',
  pin: ''
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'LOGIN_ATTEMPT':
      return {
        ...state,
        pin: initialState.pin
      }

    case 'PHONENUMBER_TEXT_CHANGE':

      if(Config.debug && Config.debugAction)
        console.log("PHONENUMBER_TEXT_CHANGE",action.text)

      return {
        ...state,
        phoneNumber: action.text
      }

    case 'PIN_TEXT_CHANGE':

      if(Config.debug && Config.debugAction)
        console.log("PIN_TEXT_CHANGE",action.text)

      return {
        ...state,
        pin: action.text
      }

    default:
      return state
  }
}