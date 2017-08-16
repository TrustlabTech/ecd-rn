/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

'use-strict'

import { Navigation } from 'react-native-navigation'

// modals
import Login from './views/Login'
// tabbar roots
import Manage from './views/Manage'
import Settings from './views/Settings'
import Attendance from './views/Attendance'
import Placeholder from './views/Placeholder'
// views
import AddChild from './views/manage/AddChild'
import AssignChild from './views/manage/AssignChild'
import UnassignChild from './views/manage/UnassignChild'
import TakeAttendance from './views/attendance/TakeAttendance'

export const
  SID_NULL = 'com.ecd.null',
  // modals
  SID_LOGIN = 'com.ecd.login',
  // tabbar roots
  SID_ATTENDANCE = 'com.ecd.attendance',
  SID_MANAGE = 'com.ecd.manage',
  SID_SETTINGS = 'com.ecd.settings',
  // views
  SID_TAKE_ATTENDANCE = 'com.ecd.take-attendance',
  SID_CHILD_ADD = 'com.ecd.child-add',
  SID_CHILD_ASSIGN = 'com.ecd.child-assign',
  SID_CHILD_UNASSIGN = 'com.ecd.child-unassign'

export default (store, Provider) => {
  // modals
  Navigation.registerComponent(SID_LOGIN, () => Login, store, Provider)
  // tabbar roots
  Navigation.registerComponent(SID_MANAGE, () => Manage, store, Provider)
  Navigation.registerComponent(SID_SETTINGS, () => Settings, store, Provider)
  Navigation.registerComponent(SID_ATTENDANCE, () => Attendance, store, Provider)
  // views
  Navigation.registerComponent(SID_TAKE_ATTENDANCE, () => TakeAttendance)
  Navigation.registerComponent(SID_CHILD_ADD, () => AddChild)
  Navigation.registerComponent(SID_CHILD_ASSIGN, () => AssignChild)
  Navigation.registerComponent(SID_CHILD_UNASSIGN, () => UnassignChild)

  Navigation.registerComponent(SID_NULL, () => Placeholder)
}
