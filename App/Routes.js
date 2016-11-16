import React, { Component } from 'react'

import LoginScene from './Scenes/LoginScene'
import MainScene from './Scenes/MainScene'
import ClassScene from './Scenes/ClassScene'
import RegisterScene from './Scenes/RegisterScene'
import AttendanceScene from './Scenes/AttendanceScene'

export default {

  login: {
    title: 'Consent ECD',
    scene: LoginScene
  },

  register: {
    title: 'Register',
    scene: RegisterScene
  },

  main: {
    title: 'Main',
    scene: MainScene
  },

  class: {
    title: 'Class',
    scene: ClassScene
  },

  attendance: {
    title: 'Attendance',
    scene: AttendanceScene
  }

}


