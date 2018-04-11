/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

import { loadIcons } from './src/constants'
import CodePush from 'react-native-code-push'
import Utils from './src/libs/Utils'

function start() {
    loadIcons().then(require('./src/app').default).catch(console.log)
}

CodePush(start())

Utils.checkForUpdate()
