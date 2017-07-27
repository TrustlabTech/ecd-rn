/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto@novalab.io>
 */

//@flow
'use-strict'

import { Navigation } from 'react-native-navigation'

import Home from './views/Home'

export const SID_HOME_ROOT = 'com.ecd.home'

export default (store, Provider) => {
  Navigation.registerComponent(SID_HOME_ROOT, () => Home, store, Provider)
  Navigation.registerComponent(SID_HOME_ROOT, () => Home)
  Navigation.registerComponent(SID_HOME_ROOT, () => Home)
}
