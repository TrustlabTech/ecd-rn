// Actions
export function attempt(textFieldValues, navigator) {
  return {
    type: 'REGISTER_ATTEMPT',
    textFieldValues: textFieldValues,
    navigator: navigator
  }
}

export function succeeded(navigator) {
  return {
    type: 'REGISTER_SUCCEEDED',
    navigator: navigator
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

export function closeModal() {
  return {
    type: 'REGISTER_CLOSE_MODAL'
  }
}

export function pickerChange(text) {
  return {
    type: 'REGISTER_PICKER_CHANGE',
    text: text
  }
}

export function fetchCentres() {
  return {
    type: 'REGISTER_FETCH_CENTRES'
  }
}

export function fetchCentresFailed(error) {
  return {
    type: 'REGISTER_FETCH_CENTRES_FAILED',
    error: error
  }
}

export function fetchCentresSucceeded(data) {
  return {
    type: 'REGISTER_FETCH_CENTRES_SUCCEEDED',
    data: data
  }
}

export function centreSelectionChanged(selection) {
  console.log("SELECTION",selection)
  return {
    type: 'REGISTER_CENTRE_SELECTION_CHANGED',
    selection: selection
  }
}