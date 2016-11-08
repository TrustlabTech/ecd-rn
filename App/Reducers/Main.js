const initialState = {
  waitingForNetwork: false,
  showWaitModal: false
}

export default (state = initialState, action = {}) => {
  switch(action.type) {

    default:
      return {
        ...state
      }
  }
}