export function fetchCentres() {
  return {
    type: 'MAIN_FETCH_CENTRES'
  }
}

export function closeModal() {
  console.log('MAIN_CLOSE_MODAL ACTION')
  return {
    type: 'MAIN_CLOSE_MODAL'
  }
}