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


export function setAttendance(attendanceData) {
  return {
    type: 'ATTENDANCE_SET',
    attendanceData
  }
}

export function submit(location, centreId, classId, attendanceData, token) {
  return {
    type: 'ATTENDANCE_SUBMIT',
    location,
    centreId,
    classId,
    attendanceData,
    token
  }
}