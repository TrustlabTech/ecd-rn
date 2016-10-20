import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet
} from 'react-native'

export default class SceneView extends Component {


  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView style={{
        flex: 1,
        flexDirection: 'column',
      }}
        contentContainerStyle={pp.ppx}>
        {this.props.children}
      </ScrollView>
    )
  }
}

const pp = StyleSheet.create({
  ppx: {
  justifyContent: 'flex-start'
  }
})