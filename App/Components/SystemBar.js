import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import Config from '../Config'

export default class SystemBar extends Component {

  render() {
    return (
      <View style={[styles.systemBar]}/>
    )
  }
}

const styles = StyleSheet.create({
  systemBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#efefef',
    height: Config.metrics.systemBarHeight
  }
})