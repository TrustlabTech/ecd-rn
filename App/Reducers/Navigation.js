import Config from '../Config'
import Routes from '../Routes'

const initialState = {
  route: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case 'NAV_PUSH':
      if(Config.debug) console.log("NAV_PUSH")
      action.navigator.push(action.route)
      return {
        ...state,
        route: action.route
      }

    case 'NAV_REPLACE':
      if(Config.debug) console.log("NAV_REPLACE")
      action.navigator.replace(action.route)
      return {
        ...state,
        route: action.route
      }

    default:
      return state
  }
}