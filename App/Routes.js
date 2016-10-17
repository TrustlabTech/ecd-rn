import React, { Component } from 'react'

import LoginScene from './Scenes/LoginScene'
import RegisterScene from './Scenes/RegisterScene'
import RegisterConfirmScene from './Scenes/RegisterConfirmScene'
import MainScene from './Scenes/MainScene'

import MainDrawer from './Components/MainDrawer'

export default {

  login: {
    title: 'Login',
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
  }
}


