/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

'use-strict'

import { NativeModules } from 'react-native'

export default class Crypto {

  static async hasKey(alias = 'staff') {
    return await NativeModules.EthereumCrypto.hasKey(alias)
  }

  static async createStaffKeyPair(password) {
    return await Crypto.createECKeypair(true, 'staff')
  }

  static async createECKeypair(store = false, alias = '') {
    try {
      return await NativeModules.EthereumCrypto.createECKeypair(store, alias)
    } catch (e) {
      console.log('[FATAL] could not create new keypair')
      console.log(e)
      return false
    }
  }

  static async sign(message, alias = 'staff') {
    try {
      return await NativeModules.EthereumCrypto.sign(message.toString('base64'), alias)
    } catch (e) {
      console.log('[FATAL] could not sign data')
      console.log(e)
      return false
    } 
  }
}
