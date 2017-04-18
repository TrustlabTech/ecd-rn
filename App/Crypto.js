'use-strict'

import { NativeModules } from 'react-native'

export default class Crypto {
  static createKeyStore = async (name, password) => {
    let keyStoresList = []
    try {
      keyStoresList = await NativeModules.Crypto.getKeyStoreList()
      if (Array.isArray(keyStoresList) && keyStoresList.indexOf(name) > -1) {
        console.log('[INFO] keystore ' + name + ' exists, creation skipped')
        return true
      }
    } catch (e) {
      console.log('[FATAL] getKeyStoreList() failed')
      console.log(e)
      return false
    }

    try {      
      return await NativeModules.Crypto.createKeyStore(name, password)
    } catch (e) {
      console.log('[FATAL] keystore creation failed')
      console.log(e)
      return false
    }
  }

  static loadKeyStore  = async (name, password) => {
    try {
      return !!await NativeModules.Crypto.loadKeyStore(name, password)      
    } catch (e) {
      console.log('[FATAL] cannot load keystore')
      console.log(e)
      return false
    }
  }

  static createECKeyPair = async (type = NativeModules.Crypto.KEYPAIR_EC, spec = 'secp256k1') => {
    try {
      return await NativeModules.Crypto.createECKeyPair(type, spec)
    } catch (e) {
      console.log('[FATAL] cannot create new keypair')
      console.log(e)
      return false
    }
  }
}