import Config from '../Config'
import Routes from '../Routes'

const initialState = {
  phoneNumber: '',
  pin: ''
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case 'LOGIN_ATTEMPT':
      console.log("LOGIN_ATTEMPT")
      return {
        ...initialState,
        // waitingForNetwork: true,
        // showWaitModal: true
      }

    case 'LOGIN_SUCCEEDED':

      // debugger
      setTimeout(function(){action.navigator.replace(Routes.main)},0)
      // action.navigator.replace(Routes.main)
      // debugger
      return {
        ...state
      }

    case 'LOGIN_FAILED':
    console.log("LOGIN_FAILED")
      return {
        ...state,
        waitingForNetwork: false,
        error: true,
        modalText: action.error || "Unknown Error"
      }

    case 'PHONENUMBER_TEXT_CHANGE':
      console.log("PHONENUMBER_TEXT_CHANGE",action.text)
      return {
        ...state,
        phoneNumber: action.text
      }

    case 'PIN_TEXT_CHANGE':
      console.log("PIN_TEXT_CHANGE")
      return {
        ...state,
        pin: action.text
      }

    default:
      return state
  }
}