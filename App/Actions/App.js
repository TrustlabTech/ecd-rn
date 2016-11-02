export function setUser(userData) {
  return {
    type: 'APP_SET_USER',
    userData: userData
  }
}

export function setCentre(centreData) {
  return {
    type: 'APP_SET_CENTRE',
    centreData: centreData
  }
}