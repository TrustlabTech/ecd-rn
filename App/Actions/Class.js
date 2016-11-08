export function doAttendance(classId) {
  return {
    type: 'CLASS_ATTENDANCE_DO',
    classId
  }
}
