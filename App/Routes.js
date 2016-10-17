import React, { Component } from 'react'
import LoginScene from './Scenes/LoginScene'
import RegisterScene from './Scenes/RegisterScene'
import RegisterConfirmScene from './Scenes/RegisterConfirmScene'
import MainScene from './Scenes/MainScene'

export default {
  login: { title: 'Login', index: 0, component: LoginScene },
  register: { title: 'Register', index: 1, component: RegisterScene },
  registerConfirm: { title: 'Register Confirm', index: 2, component: RegisterConfirmScene },
  main: { title: 'Main', index: 2, component: MainScene }
}


