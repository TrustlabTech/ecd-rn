/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

'use-strict'

export const setSession = (token, user, meta) => {
  return {
    type: 'LOGIN',
    cache: false,
    requireAuth: false,
    payload: { token, user, meta }
  }
}
