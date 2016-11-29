import React, { Component } from 'react'
import { View } from 'react-native'
import { Colours } from '../GlobalStyles'

export default class Scene extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colours.sceneBackgroundColour}}>
        {this.props.children}
      </View>
    )
  }
}
