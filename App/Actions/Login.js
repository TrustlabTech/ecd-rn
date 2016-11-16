export function attempt(phoneNumber, pin, navigator) {
  return {
    type: 'LOGIN_ATTEMPT',
    phoneNumber: phoneNumber,
    pin: pin,
    navigator: navigator
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
