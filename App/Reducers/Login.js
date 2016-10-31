import Config from '../Config'
const initialState = {
  waitingForNetwork: false,
  error: false,
  errorMessage: null
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
      return {
        ...state,
        waitingForNetwork: false,
        showWaitModal: false
      }

    case 'LOGIN_FAILED':
    console.log("LOGIN_FAILED",action)
      return {
        ...state,
        waitingForNetwork: false,
        error: true,
        errorMessage: action.error
      }

      default:
        return state
  }
}