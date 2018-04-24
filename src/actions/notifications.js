/**
 * Early Childhood Development App
 * @copyright 2018 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Zayin Krige <zkrige@gmail.com>
 */

'use-strict'

export const storeNotifications = (notifications) => {
  return {
    type: 'STORE_NOTIFICATIONS',
    payload: {
        notifications: notifications
    }
  }
}

export const removeNotifications = () => {
    return {
        type: 'REMOVE_NOTIFICATIONS'
    }
}
