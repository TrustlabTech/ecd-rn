/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 * @author Leonardo Lusoli <leonardo.lusoli@novalab.io>
 */

'use-strict'

export const storeAttendeceLocally = (attendence) => {
  return {
    type: 'STORE_ATTENDENCE',
    payload: {
      attendence
    }
  }
}
