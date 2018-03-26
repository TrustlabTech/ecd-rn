/**
 * Early Childhood Development App
 * @copyright 2018 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Zayin Krige <zkrige@gmail.com>
 */

'use-strict'

export const storePupils = (pupils) => {
  return {
    type: 'STORE_PUPILS',
    payload: pupils
  }
}

export const updateAttendanceTime = (pupils) => {
  return {
    type: 'UPDATE_ATTENDANCE_TIME',
    payload: pupils
  }
} 
