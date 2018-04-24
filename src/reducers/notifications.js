/**
 * Early Childhood Development App
 * @copyright 2018 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Zayin Krige <zkrige@gmail.com>
 */

'use-strict'

import tree from '../store/tree'
import { REHYDRATE } from 'redux-persist/constants'

export default (state = tree.notifications, action) => {
    switch (action.type) {
        case 'STORE_NOTIFICATIONS':
            return {
                ...state,
                notifications: [
                    action.payload.notifications,
                ]
            }
        case 'REMOVE_NOTIFICATIONS':
            return {
                notifications: []
            }
        case REHYDRATE: {
            return {
                ...state,
                ...action.payload.notifications,
            }
        }
        default:
            return state || {}
    }
}
