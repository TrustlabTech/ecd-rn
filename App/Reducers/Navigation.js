import Config from '../Config'
import Routes from '../Routes'

const initialState = {
  route: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case 'NAV_PUSH_DO':
      action.navigator.push(action.route)

      return {
        ...state,
        route: action.route
      }

    case 'NAV_REPLACE_DO':
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