export function push(route) {
  return {
    type: 'NAV_PUSH',
    route
  }
}

export function replace(route) {
  return {
    type: 'NAV_REPLACE',
    route
  }
}