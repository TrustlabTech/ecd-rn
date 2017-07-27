/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto@novalab.io>
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
import registerScreens, {
  SID_HOME_ROOT
} from './screens'


export default (ICONS) => {
  // enable LayoutAnimation on Android
  // https://facebook.github.io/react-native/docs/layoutanimation.html
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

  const store = configureStore()
  registerScreens(store, Provider)

  const tabsStyle = {
  }

  const passProps = {
  }

  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Home',
        title: 'Home',
        screen: SID_HOME_ROOT,
        icon: ICONS.home24,
        selectedIcon: ICONS.home24,
      },
      {
        label: 'History',
        title: 'History',
        screen: SID_HOME_ROOT,
        icon: ICONS.history24,
        selectedIcon: ICONS.history24,
      },
      {
        label: 'Manage',
        title: 'Manage',
        screen: SID_HOME_ROOT,
        icon: ICONS.edit24,
        selectedIcon: ICONS.edit24,
      },
      {
        label: 'Settings',
        title: 'Settings',
        screen: SID_HOME_ROOT,
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
