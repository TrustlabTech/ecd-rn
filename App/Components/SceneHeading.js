import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import GlobalStyles from '../GlobalStyles'
export default class SceneHeading extends Component {

  render() {
    return (
      <View style={styles.sceneHeadingView}>
        <Text style={GlobalStyles.h3}>{this.props.text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sceneHeadingView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sceneHeadingText: {
    fontSize: 32,
    color: '#3f3f3f'
  }
})