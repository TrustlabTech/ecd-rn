export function fetchClasses(centreId) {
  return {
    type: 'ATTENDANCE_FETCH_CLASSES',
    centreId: centreId
  }
}

export function fetchClassesSucceeded() {
  return {
    type: 'ATTENDANCE_FETCH_CLASSES_SUCCEEDED'
  }
}