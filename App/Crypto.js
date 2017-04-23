'use-strict'

import { NativeModules } from 'react-native'

export default class Crypto {
  static createKeyStore = async (name, password) => {
    let keyStoresList = []
    try {
      keyStoresList = await NativeModules.EthereumCrypto.getKeyStoreList()
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
      return await NativeModules.EthereumCrypto.createKeyStore(name, password)
    } catch (e) {
      console.log('[FATAL] keystore creation failed')
      console.log(e)
      return false
    }
  }

  static loadKeyStore  = async (name, password) => {
    try {
      await NativeModules.EthereumCrypto.loadKeyStore(name, password)
      return true
    } catch (e) {
      console.log('[FATAL] could not load keystore')
      console.log(e)
      return false
    }
  }

  static createStaffKeyPair = async (password, certificateFilename = 'cert.pem') => {
    return await Crypto.createECKeypair(true, 'staff', password, certificateFilename)
  }

  static createECKeypair = async (store = false, alias = '', password = '', certificateFilename = 'cert.pem') => {
    try {
      return await NativeModules.EthereumCrypto.createECKeypair(store, alias, password, certificateFilename)
    } catch (e) {
      console.log('[FATAL] could not create new keypair')
      console.log(e)
      return false
    }
  }

  static sign = async (data, alias, password, algo = NativeModules.EthereumCrypto.SIG_SHA256_WITH_ECDSA) => {
    try {
      return await NativeModules.EthereumCrypto.sign(data, 'private' + alias, password, true, algo)
    } catch (e) {
      console.log('[FATAL] could not sign data')
      console.log(e)
      return false
    } 
  }
}