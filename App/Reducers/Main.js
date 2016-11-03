const initialState = {
  waitingForNetwork: false,
  showWaitModal: false
}

export default (state = initialState, action = {}) => {
  switch(action.type) {

    case 'MAIN_CLOSE_MODAL':
      console.log('MAIN_CLOSE_MODAL')
      return {
        ...state,
        showWaitModal: false
      }

    default:
      return {
        ...state
      }
  }
}