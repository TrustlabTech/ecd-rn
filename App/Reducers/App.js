import { ModalMode } from '../Components/WaitModal'

const initialState = {
  userData: null,
  centreData: null,
  classData: [],
  modalVisible: false,
  modalText: "Please wait",
  modalMode: ModalMode.WAITING
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
      return {
        ...state,
        modalVisible: action.modalOptions.modalVisible,
        modalText: action.modalOptions.modalText,
        modalMode: action.modalOptions.modalMode
      }

    default:
      return state
  }
}