import React, { Component } from 'react'
import Both from './index.both.js'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'
export default class Ecdrn extends Component {
  render() {
    return (
      <Both os="ios"/>
    )
  }
}

AppRegistry.registerComponent('Ecdrn', () => Ecdrn)
