export function fetchCentres(token) {
  console.log('THE DATA',token)
  return {
    type: 'MAIN_FETCH_CENTRES',
    token: token
  }
}

