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
import History from './views/History'
import Settings from './views/Settings'
import Attendance from './views/Attendance'
import Placeholder from './views/Placeholder'
// views
import AddChild from './views/manage/AddChild'
import AssignChild from './views/manage/AssignChild'
import HistoryList from './views/history/HistoryList'
import UnassignChild from './views/manage/UnassignChild'
import TakeAttendance from './views/attendance/TakeAttendance'

export const
  SID_NULL = 'foundation.ixo.amply.ecd.null',
  // modals
  SID_LOGIN = 'foundation.ixo.amply.ecd.login',
  // tabbar roots
  SID_ATTENDANCE = 'foundation.ixo.amply.ecd.attendance',
  SID_MANAGE = 'foundation.ixo.amply.ecd.manage',
  SID_HISTORY = 'foundation.ixo.amply.ecd.history',
  SID_SETTINGS = 'foundation.ixo.amply.ecd.settings',
  // views
  SID_TAKE_ATTENDANCE = 'foundation.ixo.amply.ecd.take-attendance',
  SID_CHILD_ADD = 'foundation.ixo.amply.ecd.child-add',
  SID_CHILD_ASSIGN = 'foundation.ixo.amply.ecd.child-assign',
  SID_CHILD_UNASSIGN = 'foundation.ixo.amply.ecd.child-unassign',
  SID_HISTORY_LIST = 'foundation.ixo.amply.ecd.history-list'

export default (store, Provider) => {
  // modals
  Navigation.registerComponent(SID_LOGIN, () => Login, store, Provider)
  // tabbar roots
  Navigation.registerComponent(SID_ATTENDANCE, () => Attendance, store, Provider)
  Navigation.registerComponent(SID_HISTORY, () => History, store, Provider)
  Navigation.registerComponent(SID_MANAGE, () => Manage, store, Provider)
  Navigation.registerComponent(SID_SETTINGS, () => Settings, store, Provider)
  // views
  Navigation.registerComponent(SID_TAKE_ATTENDANCE, () => TakeAttendance, store, Provider)
  Navigation.registerComponent(SID_CHILD_ADD, () => AddChild, store, Provider)
  Navigation.registerComponent(SID_CHILD_ASSIGN, () => AssignChild)
  Navigation.registerComponent(SID_CHILD_UNASSIGN, () => UnassignChild)
  Navigation.registerComponent(SID_HISTORY_LIST, () => HistoryList)

  Navigation.registerComponent(SID_NULL, () => Placeholder)
}
