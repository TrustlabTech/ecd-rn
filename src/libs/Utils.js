/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Zayin Krige <zayin@krige.org>
 */

'use-strict'

var luhn = require('luhn-alg');

export default class Utils {

  static validSAIDNumber = (idNumber) => {
    let toRet = luhn(idNumber)
    return toRet
  }


}