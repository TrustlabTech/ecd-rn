/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

 //@flow
'use-strict'

// base libs
import { Provider } from 'react-redux'
import { UIManager } from 'react-native'
import codePush from 'react-native-code-push'
import { Navigation } from 'react-native-navigation'
// func/utils/consts
import configureStore from './store/config'
import { COLORS } from './constants'
import registerScreens, {
  SID_MANAGE,
  SID_HISTORY,
  SID_SETTINGS,
  SID_ATTENDANCE,
} from './screens'

export default (ICONS) => {
  // enable LayoutAnimation on Android
  // https://facebook.github.io/react-native/docs/layoutanimation.html
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

  const store = configureStore()
  registerScreens(store, Provider)

  const tabsStyle = {
    tabBarButtonColor: COLORS.lightGrey2,
    tabBarBackgroundColor: COLORS.white,
    tabBarSelectedButtonColor: COLORS.brandFirst,
  }
  
  const passProps = {
  }

  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Attendance',
        title: 'Attendance',
        screen: SID_ATTENDANCE,
        icon: ICONS.dashboard24,
        selectedIcon: ICONS.dashboard24,
      },
      {
        label: 'History',
        title: 'History',
        screen: SID_HISTORY,
        icon: ICONS.history24,
        selectedIcon: ICONS.history24,
      },
      {
        label: 'Manage',
        title: 'Manage',
        screen: SID_MANAGE,
        icon: ICONS.edit24,
        selectedIcon: ICONS.edit24,
      },
      {
        label: 'Settings',
        title: 'Settings',
        screen: SID_SETTINGS,
        icon: ICONS.settings24,
        selectedIcon: ICONS.settings24,
      }
    ],
    appStyle: {
      orientation: 'portrait',
      navBarTitleTextCentered: true,
      ...tabsStyle, // for android
    },
    tabsStyle, // for ios
    passProps,
    animationType: 'fade'
  })

  codePush.sync({ installMode: codePush.InstallMode.ON_NEXT_RESTART })
}
