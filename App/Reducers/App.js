
const initialState = {
  userData: null,
  centreData: null,
  modalVisible: false,
  modalText: "Please wait",
  modalWait: false
}

export default (state = initialState, action = {}) => {

  switch (action.type) {

    case 'APP_SET_USER':
      return {
        ...state,
        userData: action.userData
      }

    case 'APP_SET_CENTRE':
      return {
        ...state,
        centreData: action.centreData
      }

    case 'APP_MODAL_SHOW':
      return {
        ...state,
        modalVisible: action.modalVisible
      }

    case 'APP_MODAL_SET_TEXT':
      return {
        ...state,
        modalText: action.modalText
      }

    case 'APP_MODAL_WAIT':
      return {
        ...state,
        modalWait: action.modalWait
      }

    default:
      return state
  }
}