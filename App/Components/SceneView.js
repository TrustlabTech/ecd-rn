import React, { Component } from 'react'
import {
  ScrollView,
  View
} from 'react-native'

export default class SceneView extends Component {


  constructor(props) {
    super(props)
  }

  render() {
    return (

      <ScrollView style={{flex: 1}}>

        {this.props.children}

      </ScrollView>
    )
  }
}
