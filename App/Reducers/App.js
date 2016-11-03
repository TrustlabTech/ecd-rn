
const initialState = {
  userData: null,
  centreData: null
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
    default:
      return state
  }
}