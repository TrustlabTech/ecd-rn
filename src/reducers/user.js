// @flow
'use-strict'

// import tree from '../store/tree'

export default function user(state/*state = tree.user*/, action) {
  switch (action.type) {
    case 'LOGIN': // eslint-disable-line
      return { // eslint-disable-line
        ...state,
        ...action.payload,
      }
    default: // eslint-disable-line
      return state || {} // eslint-disable-line
  }
}
