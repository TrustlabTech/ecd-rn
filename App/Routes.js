import React, { Component } from 'react'

//Scenes
import LoginScene from './Scenes/LoginScene'
import RegisterScene from './Scenes/RegisterScene'
import RegisterConfirmScene from './Scenes/RegisterConfirmScene'
import MainScene from './Scenes/MainScene'
import CentreScene from './Scenes/CentreScene'
import ChildScene from './Scenes/ChildScene'
import StaffScene from './Scenes/StaffScene'
import ClassScene from './Scenes/ClassScene'
import AttendanceScene from './Scenes/AttendanceScene'
import ProfileScene from './Scenes/ProfileScene'


//Drawers
import MainDrawer from './Components/MainDrawer'

export default {

  login: {
    title: 'Consent ECD',
    scene: LoginScene,
    drawer: null
  },

  register: {
    title: 'Register',
    scene: RegisterScene,
    drawer: null
  },

  registerConfirm: {
    title: 'Register Confirm',
    scene: RegisterConfirmScene,
    drawer: null
  },

  main: {
    title: 'Main',
    scene: MainScene,
    drawer: MainDrawer
  },

  centre: {
    title: 'Centre',
    scene: CentreScene,
    drawer: null
  },

  child: {
    title: 'Child',
    scene: ChildScene,
    drawer: null
  },

  staff: {
    title: 'Staff',
    scene: StaffScene,
    drawer: null
  },

  class: {
    title: 'Class',
    scene: ClassScene,
    drawer: null
  },

  attendance: {
    title: 'Attendance',
    scene: AttendanceScene,
    drawer: null
  },

  profile: {
    title: 'Profile',
    scene: ProfileScene,
    drawer: null
  }

}


