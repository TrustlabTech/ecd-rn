/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto@novalab.io>
 */

'use-strict'

import MIcons from 'react-native-vector-icons/MaterialIcons'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'

let ICONS_WORKER = {}

export const loadIcons = async () => {
  // tabbar icons
  ICONS_WORKER.home24 = await MIcons.getImageSource('home', 24, 'grey')
  ICONS_WORKER.edit24 = await MIcons.getImageSource('mode-edit', 24, 'grey')
  ICONS_WORKER.history24 = await MIcons.getImageSource('history', 24, 'grey')
  ICONS_WORKER.settings24 = await MIcons.getImageSource('settings', 24, 'grey')
  /*
  ICONS_WORKER.accountCircle24 = await MIcons.getImageSource('account-circle', 24, 'white')
  ICONS_WORKER.bell24 = await MCIcons.getImageSource('bell', 24, 'white')
  ICONS_WORKER.pencil18 = await MCIcons.getImageSource('lead-pencil', 18, 'grey')
  ICONS_WORKER.home24 = await MIcons.getImageSource('home', 24, 'white')
  ICONS_WORKER.eye24 = await MCIcons.getImageSource('eye-outline', 24, 'white')
  ICONS_WORKER.back24 = await MCIcons.getImageSource('keyboard-backspace', 24, 'white')
  ICONS_WORKER.info24 = await MIcons.getImageSource('info', 24, 'white')
  ICONS_WORKER.like18 = await MIcons.getImageSource('favorite', 18, 'grey')
  ICONS_WORKER.comment18 = await MCIcons.getImageSource('comment', 18, 'grey')
  ICONS_WORKER.cloud18 = await MCIcons.getImageSource('cloud', 18, 'grey')
  ICONS_WORKER.location18 = await MIcons.getImageSource('location-on', 18, '#0086b3')
  */

  return ICONS_WORKER
}

export const ICONS = ICONS_WORKER  
