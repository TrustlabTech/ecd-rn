export function fetchCentres(token) {
  console.log('MAIN_FETCH_CENTRES')
  return {
    type: 'MAIN_FETCH_CENTRES',
    token: token
  }
}

export function fetchClasses(staffId, token) {
  console.log('MAIN_FETCH_CLASSES')
  return {
    type: 'MAIN_FETCH_CLASSES',
    staffId,
    token
  }
}
