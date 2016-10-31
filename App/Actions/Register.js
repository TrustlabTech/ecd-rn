export function attempt(textFieldValues) {
    console.log("REGISTER_ATTEMPT",textFieldValues)

  return {
    type: 'REGISTER_ATTEMPT',
    phoneNumber: textFieldValues['phoneNumber'],
    pin: textFieldValues['pin']
  }
}

export function succeeded() {
  return {
    type: 'REGISTER_SUCCEEDED'
  }
}

export function failed(error) {
  return {
    type: 'REGISTER_FAILED',
    error: error
  }
}

export function textChange(text, textFieldName) {
  return {
    type: 'REGISTER_TEXT_CHANGE',
    text: text,
    textFieldName: textFieldName
  }
}
