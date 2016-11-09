export function fetchClasses(centreId) {
  return {
    type: 'ATTENDANCE_FETCH_CLASSES',
    centreId: centreId
  }
}

export function fetchClass(classId, token) {
  return {
    type: 'ATTENDANCE_FETCH_CLASS',
    classId,
    token
  }
}

// export function fetchClassesSucceeded() {
//   return {
//     type: 'ATTENDANCE_FETCH_CLASSES_SUCCEEDED'
//   }
// }

export function submit(classId, attendanceData, token) {
  return {
    type: 'ATTENENDANCE_SUBMIT',
    classId,
    attendanceData,
    token
  }
}