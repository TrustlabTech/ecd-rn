/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */

// import React, { Component } from 'react'

import ClassScene from './Scenes/ClassScene'
import AttendanceScene from './Scenes/AttendanceScene'
import LoginScene from './Scenes/LoginScene'
import MainScene from './Scenes/MainScene'
import HistoryScene from './Scenes/HistoryScene'

export default {
  history: {
    title: 'ECD APP',
    scene: HistoryScene
  },
  main: {
    title: 'ECD APP',
    scene: MainScene
  },

  login: {
    title: 'ECD APP',
    scene: LoginScene
  },

  class: {
    title: 'ECD APP',
    scene: ClassScene
  },

  attendance: {
    title: 'ECD APP',
    scene: AttendanceScene
  }

}


