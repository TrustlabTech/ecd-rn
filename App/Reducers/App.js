
const initialState = {
  userData: null
}

export default (state = initialState, action = {}) => {

  switch (action.type) {

    case 'APP_SET_USER':
      return {
        ...state,
        userData: action.userData
      }

    default:
      return state
  }
}