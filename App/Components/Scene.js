import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Colours } from '../GlobalStyles'

export default class Scene extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    if(this.props.loaded === true) {
      return (
        <View style={{flex: 1, backgroundColor: Colours.sceneBackgroundColour}}>
          {this.props.children}
        </View>
      )
    } else {
      return (
        <Text>Page is loading</Text>
      )
    }
  }
}
