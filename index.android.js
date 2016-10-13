import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Both from './index.both.js'

export default class Ecdrn extends Component {
  render() {
    return (
      <Both os="android"/>
    );
  }
}

AppRegistry.registerComponent('Ecdrn', () => Ecdrn);
