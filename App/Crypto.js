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
      await NativeModules.Crypto.loadKeyStore(name, password)
      return true
    } catch (e) {
      console.log('[FATAL] could not load keystore')
      console.log(e)
      return false
    }
  }

  static createStaffKeyPair = async (password, certificateFilename = 'cert.pem') => {
    const type = NativeModules.Crypto.KEYPAIR_EC,
          alias = 'staff',
          spec = 'secp256k1'

    try {
      return await NativeModules.Crypto.addKeyPair(type, alias, spec, password, certificateFilename)
    } catch (e) {
      console.log('[FATAL] could not create keypair in keystore')
      console.log(e)
      return false
    }
  }

  static createECKeyPair = async (type = NativeModules.Crypto.KEYPAIR_EC, spec = 'secp256k1') => {
    try {
      return await NativeModules.Crypto.createECKeyPair(type, spec)
    } catch (e) {
      console.log('[FATAL] could not create new keypair')
      console.log(e)
      return false
    }
  }

  static sign = async (data, alias, password, algo = NativeModules.Crypto.SIG_SHA256_WITH_ECDSA) => {
    try {
      return await NativeModules.Crypto.sign(data, 'private' + alias, password, true, algo)
    } catch (e) {
      console.log('[FATAL] could not sign data')
      console.log(e)
      return false
    } 
  }
}