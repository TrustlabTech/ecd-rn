export function push(route, navigator) {
  return {
    type: 'NAV_PUSH_REQUEST',
    route,
    navigator
  }
}

export function doPush(route, navigator) {
  return {
    type: 'NAV_PUSH_DO',
    route,
    navigator
  }
}

export function replace(route) {
  return {
    type: 'NAV_REPLACE',
    route
  }
}