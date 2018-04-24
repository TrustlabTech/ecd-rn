/**
 * Early Childhood Development App
 * @copyright 2018 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Zayin Krige <zkrige@gmail.com>
 */
'use-strict'

export const storeAttendanceLocally = (attendance) => {
  return {
    type: 'STORE_ATTENDANCE',
    payload: {
      attendance
    }
  }
}

export const removeAttendancesLocally = () => {
  return {
    type: 'REMOVE_ATTENDANCES'
  }
}
