
const initialState = {
  userData: null,
  centreData: null,
  modalVisible: false,
  modalText: "Please wait",
  modalWaiting: false
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
      const {
        modalVisible,
        modalText,
        modalWaiting
      } = action.modalOptions
      // true
      // false
      // undefined//null


      if(modalVisible === undefined || modalVisible === null)
        modalVisible = state.modalVisible

      if(modalWaiting === undefined || modalWaiting === null)
        modalWaiting = state.modalWaiting


      return {
        ...state,
        modalVisible: modalVisible,
        modalText: modalText,
        modalWaiting: modalWaiting
      }

    // case 'APP_MODAL_SHOW':
    //   return {
    //     ...state,
    //     modalVisible: action.modalVisible
    //   }

    // case 'APP_MODAL_SET_TEXT':
    //   return {
    //     ...state,
    //     modalText: action.modalText
    //   }

    // case 'APP_MODAL_WAITING':
    //   return {
    //     ...state,
    //     modalWaiting: action.modalWaiting
    //   }

    default:
      return state
  }
}