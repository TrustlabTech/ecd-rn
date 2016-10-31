import Config from '../Config'

const initialTextFieldValues = []
initialTextFieldValues['firstName'] = ''
initialTextFieldValues['lastName'] = ''
initialTextFieldValues['phoneNumber'] = ''
initialTextFieldValues['pin'] = ''
initialTextFieldValues['pinConfirm'] = ''

const initialState = {
  waitingForNetwork: false,
  showWaitModal: false,
  error: false,
  errorMessage: null,
  textFieldValues: initialTextFieldValues
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case 'REGISTER_ATTEMPT':
      console.log("REGISTER_ATTEMPT")
      return {
        ...initialState,
        waitingForNetwork: true,
        showWaitModal: true
      }

    case 'REGISTER_SUCCEEDED':
      console.log("REGISTER_SUCCEEDED")
      return {
        ...state,
        waitingForNetwork: false,
        showWaitModal: false
      }

    case 'REGISTER_FAILED':
      console.log("REGISTER_FAILED",action)
      return {
        ...state,
        waitingForNetwork: false,
        error: true,
        errorMessage: action.error
      }

    case 'REGISTER_TEXT_CHANGE':
      console.log("TEXT_CHANGE", action)
      const { textFieldValues } = state
      console.log("TEXT FIELD NAME", action.textFieldName)
      console.log("TEXT TEXT",action.text)
      textFieldValues[action.textFieldName] = action.text
      console.log("TEXT FIELD VALUES",textFieldValues)
      return {
        ...state,
        textFieldValues: state.textFieldValues
      }

    default:
      return state
  }
}