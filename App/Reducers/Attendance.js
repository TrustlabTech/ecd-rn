import Config from '../Config'
import Routes from '../Routes'
const initialState = {
  waitingForNetwork: false,
  showWaitModal: false,
  error: false,
  modalText: null

}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case 'ATTENDANCE_FETCH_CLASSES':
      return {
        ...state,
        waitingForNetwork: true,
        showWaitModal: true,
        modalText: "Loading"
      }

      case 'ATTENDANCE_SET':
        return {
          ...state,
          attendanceData: action.attendanceData
        }

      case 'ATTENDANCE_FETCH_CLASSES_SUCCEEDED':
        return {
          ...state,
          waitingForNetwork: false,
          showWaitModal: false
        }

      case 'ATTENDANCE_FETCH_CLASSES_FAILED':
        return {
          ...state,
          waitingForNetwork: false,
          showWaitModal: false,
          error: action.error
        }

      default:
        return state
  }
}