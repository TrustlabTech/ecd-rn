import Config from '../Config'
import Routes from '../Routes'
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
  modalText: "Please wait",
  textFieldValues: initialTextFieldValues,
  centreSelectValues: ["..."],
  centreSelectSelected: "Your mom",
  centreSelectValuesFetched: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case 'REGISTER_ATTEMPT':
      console.log('REGISTER_ATTEMPT')
      return {
        ...initialState,
        waitingForNetwork: true,
        showWaitModal: true,
        navigator: action.navigator,
        modalText: initialState.modalText
      }

    case 'REGISTER_SUCCEEDED':
      console.log("REGISTER_SUCCEEDED")
      // Need register success message before pop
      action.navigator.push(Routes.registerConfirm)
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
        modalText: action.error
      }

    case 'REGISTER_TEXT_CHANGE':
      const { textFieldValues } = state
      textFieldValues[action.textFieldName] = action.text
      return {
        ...state,
        textFieldValues: state.textFieldValues
      }

    case 'REGISTER_CLOSE_MODAL':
      return {
        ...state,
        showWaitModal: false
      }

    case 'REGISTER_PICKER_CHANGE':
      return {
        ...state,
        centre: action.text
      }

    case 'REGISTER_FETCH_CENTRES':

      return {
        ...state,
        waitingForNetwork: true,
        showWaitModal: true,
        centreSelectValuesFetched: true,
        modalText: initialState.modalText
      }

    case 'REGISTER_FETCH_CENTRES_FAILED':
      return {
        ...state,
        waitingForNetwork: false,
        error: true,
        modalText: action.error,
        showWaitModal: true
      }

    case 'REGISTER_FETCH_CENTRES_SUCCEEDED':
      //action.data
      const { centreSelectValues } = state
      // centreSelectValues
      action.data.forEach((item, index) => {
        centreSelectValues[index] = item.name
      })
      return {
        ...state,
        waitingFornetwork: false,
        showWaitModal: false,
        centreSelectValues: centreSelectValues,
        modalText: initialState.modalText
      }

    case 'REGISTER_CENTRE_SELECTION_CHANGED':
      return {
        ...state,
        centreSelectSelected: action.selection
      }

    default:
      return state
  }
}