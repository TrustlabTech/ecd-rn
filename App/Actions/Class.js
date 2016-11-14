export function doAttendance(classId) {
  return {
    type: 'CLASS_ATTENDANCE_DO',
    classId
  }
}

export function fetchClasses(staffId, token) {
  console.log('CLASS_FETCH_CLASSES')
  return {
    type: 'CLASS_FETCH_CLASSES',
    staffId,
    token
  }
}