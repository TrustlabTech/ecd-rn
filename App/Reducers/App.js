import { ModalMode } from '../Components/WaitModal'

const initialState = {
  userData: null,
  centreData: null,
  modalVisible: false,
  modalText: "Please wait",
  modalMode: ModalMode.OKAY,
  modalOnPositive: function() { console.log('DEFAULT POSITIVE')},
  modalPositiveText: 'Yes',
  modalOnNegative: function() { console.log('DEFAULT NEGATIVE')},
  modalNegativeText: 'No'
}

export default (state = initialState, action = {}) => {

  switch (action.type) {

    case 'APP_SET_USER':
      return {
        ...state,
        userData: action.userData
      }

    case 'APP_SET_CLASS':
      return {
        ...state,
        classData: action.classData
      }
    case 'APP_SET_CENTRE':
      return {
        ...state,
        centreData: action.centreData
      }

    case 'APP_SET_MODAL':

      const opts = action.modalOptions
      const nextState = {}

      if(typeof opts.modalVisible !== 'undefined')
        nextState.modalVisible = opts.modalVisible

      if(typeof opts.modalText !== 'undefined')
        nextState.modalText = opts.modalText

      if(typeof opts.modalMode !== 'undefined')
        nextState.modalMode = opts.modalMode

      if(typeof opts.modalOnPositive !== 'undefined')
        nextState.modalOnPositive = opts.modalOnPositive
      else
        nextState.modalOnPositive = initialState.modalOnPositive

      if(typeof opts.modalOnNegative !== 'undefined')
        nextState.modalOnNegative = opts.modalOnNegative
      else
        nextState.modalOnNegative = initialState.modalOnNegative

      if(typeof opts.modalPositiveText !== 'undefined')
        nextState.modalPositiveText = opts.modalPositiveText
      else
        nextState.modalPositiveText = initialState.modalPositiveText

      if(typeof opts.modalNegativeText !== 'undefined')
        nextState.modalNegativeText = opts.modalNegativeText
      else
        nextState.modalNegativeText = initialState.modalNegativeText

      return {
        ...state,
        ...nextState,
      }

    default:
      return state
  }
}