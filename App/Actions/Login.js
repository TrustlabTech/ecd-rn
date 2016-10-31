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