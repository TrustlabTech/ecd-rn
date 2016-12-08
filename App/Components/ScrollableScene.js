import React, { Component } from 'react'
import {
  ScrollView,
  View,
  ActivityIndicator
} from 'react-native'
import Scene from '../Components/Scene'
import { Colours } from '../GlobalStyles'

export default class ScrollableScene extends Component {


  constructor(props) {
    super(props)
  }

  render() {
    if(this.props.loaded) {

      return (

        <ScrollView style={{flex: 1, backgroundColor: Colours.sceneBackgroundColour }}>
          {this.props.children}
        </ScrollView>
      )
    } else {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator
            animating={true}
            style={{height: 80}}
            size="large"
          />
        </View>
      )
    }
  }
}
