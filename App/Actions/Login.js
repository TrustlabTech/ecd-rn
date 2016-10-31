export function attempt(phoneNumber, pin) {
  return {
    type: 'LOGIN_ATTEMPT',
    phoneNumber: phoneNumber,
    pin: pin
  }
}

export function succeeded() {
  return {
    type: 'LOGIN_SUCCEEDED'
  }
}

export function failed(error) {
  return {
    type: 'LOGIN_FAILED',
    error: error
  }
}

export function phoneNumberTextChange(text) {
  return {
    type: 'PHONENUMBER_TEXT_CHANGE',
    text: text
  }
}

export function pinTextChange(text) {
  return {
    type: 'PIN_TEXT_CHANGE',
    text: text
  }
}

export function closeModal() {
  return {
    type: 'LOGIN_CLOSE_MODAL'
  }
}