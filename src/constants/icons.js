/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

'use-strict'

import { COLORS } from './colors'
import MIcons from 'react-native-vector-icons/MaterialIcons'
// import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'

let ICONS = {}

export const loadIcons = async () => {
  // tabbar icons
  ICONS.edit24 = await MIcons.getImageSource('mode-edit', 24, 'grey')
  ICONS.history24 = await MIcons.getImageSource('history', 24, 'grey')
  ICONS.settings24 = await MIcons.getImageSource('settings', 24, 'grey')
  ICONS.dashboard24 = await MIcons.getImageSource('dashboard', 24, 'grey')

  // navigation
  ICONS.exitToApp12 = await MIcons.getImageSource(
    'exit-to-app',
    12,
    COLORS.lightGrey2
  )
  ICONS.navigateRight12 = await MIcons.getImageSource(
    'chevron-right',
    12,
    COLORS.lightGrey2
  )

  // misc
  ICONS.sync12 = await MIcons.getImageSource('sync', 12, COLORS.lightGrey2)
  ICONS.home20 = await MIcons.getImageSource('home', 20, COLORS.darkGrey2)
  ICONS.person20 = await MIcons.getImageSource('person', 20, COLORS.darkGrey2)
  ICONS.people20 = await MIcons.getImageSource('people', 20, COLORS.darkGrey2)
  ICONS.checkBox20 = await MIcons.getImageSource(
    'check-box',
    20,
    COLORS.darkGrey2
  )
  ICONS.peopleOutline20 = await MIcons.getImageSource(
    'people-outline',
    20,
    COLORS.darkGrey2
  )

  // branding
  ICONS.logo = require('Ecd/src/assets/logo_2.png')
  /*
  ICONS.accountCircle24 = await MIcons.getImageSource('account-circle', 24, 'white')
  ICONS.bell24 = await MCIcons.getImageSource('bell', 24, 'white')
  ICONS.pencil18 = await MCIcons.getImageSource('lead-pencil', 18, 'grey')
  ICONS.home24 = await MIcons.getImageSource('home', 24, 'white')
  ICONS.eye24 = await MCIcons.getImageSource('eye-outline', 24, 'white')
  ICONS.back24 = await MCIcons.getImageSource('keyboard-backspace', 24, 'white')
  ICONS.info24 = await MIcons.getImageSource('info', 24, 'white')
  ICONS.like18 = await MIcons.getImageSource('favorite', 18, 'grey')
  ICONS.comment18 = await MCIcons.getImageSource('comment', 18, 'grey')
  ICONS.cloud18 = await MCIcons.getImageSource('cloud', 18, 'grey')
  ICONS.location18 = await MIcons.getImageSource('location-on', 18, '#0086b3')
  */

  return ICONS
}

export { ICONS }
