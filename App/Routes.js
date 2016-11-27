/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */

/* Routes.js
 * Outlines the available scenes for navigation
 */
import React, { Component } from 'react'

import LoginScene from './Scenes/LoginScene'
import MainScene from './Scenes/MainScene'
import ClassScene from './Scenes/ClassScene'
import AttendanceScene from './Scenes/AttendanceScene'

export default {

  login: {
    title: 'ECD APP',
    scene: LoginScene
  },

  main: {
    title: 'ECD APP',
    scene: MainScene
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


