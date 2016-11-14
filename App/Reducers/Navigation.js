import Config from '../Config'
import Routes from '../Routes'

const initialState = {
  route: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case 'NAV_PUSH':
      setTimeout(function(){
        action.navigator.push(action.route)
      },0)
      return {
        ...state,
        route: action.route
      }

    case 'NAV_REPLACE':
      setTimeout(function(){
        action.navigator.replace(action.route)
      },0)
      return {
        ...state,
        route: action.route
      }

    default:
      return state
  }
}