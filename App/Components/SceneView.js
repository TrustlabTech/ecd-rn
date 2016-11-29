import React, { Component } from 'react'
import {
  ScrollView,
  View
} from 'react-native'

import { Colours } from '../GlobalStyles'

export default class SceneView extends Component {


  constructor(props) {
    super(props)
  }

  render() {
    return (

      <ScrollView style={{flex: 1, backgroundColor: Colours.sceneBackgroundColour }}>

        {this.props.children}

      </ScrollView>
    )
  }
}
