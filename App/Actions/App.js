// Global State
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

export function setClass(classData) {
  return {
    type: 'APP_SET_CLASS',
    classData: classData
  }
}

export function setModal(modalOptions = {}) {
  return {
    type: 'APP_SET_MODAL',
    modalOptions: modalOptions
  }
}