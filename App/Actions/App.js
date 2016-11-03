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

// Modal
export function showModal(visible) {
  return {
    type: 'APP_MODAL_SHOW',
    modalVisible: visible
  }
}

export function setModalText(text) {
  return {
    type: 'APP_MODAL_SET_TEXT',
    modalText: text
  }
}

export function setModalWait(wait) {
  return {
    type: 'APP_MODAL_SET_WAIT',
    modalWait: wait
  }
}