export function attempt(phoneNumber, pin, navigator) {
  return {
    type: 'LOGIN_ATTEMPT',
    phoneNumber: phoneNumber,
    pin: pin,
    navigator: navigator
  }
}

export function succeeded(navigator) {

  return {
    type: 'LOGIN_SUCCEEDED',
    navigator: navigator
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