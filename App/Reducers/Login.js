import Config from '../Config'
import Routes from '../Routes'
const initialState = {
  waitingForNetwork: false,
  showWaitModal: false,
  error: false,
  errorMessage: null,
  phoneNumber: '',
  pin: ''
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case 'LOGIN_ATTEMPT':
      console.log("LOGIN_ATTEMPT")
      return {
        ...initialState,
        waitingForNetwork: true,
        showWaitModal: true
      }

    case 'LOGIN_SUCCEEDED':
      console.log("LOGIN_SUCCEEDED")
      action.navigator.push(Routes.main)
      //
      return {
        ...state,
        waitingForNetwork: false,
        showWaitModal: false
      }

    case 'LOGIN_FAILED':
    console.log("LOGIN_FAILED")
      return {
        ...state,
        waitingForNetwork: false,
        error: true,
        errorMessage: action.error
      }

    case 'PHONENUMBER_TEXT_CHANGE':
      console.log("PHONENUMBER_TEXT_CHANGE")
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

    case 'LOGIN_CLOSE_MODAL':
      console.log("LOGIN_CLOSE_MODAL")
      return {
        ...state,
        showWaitModal: false
      }
    default:
      return state
  }
}