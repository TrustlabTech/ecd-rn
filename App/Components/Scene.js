/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native'
import { Colours } from '../GlobalStyles'

export default class Scene extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    if(this.props.loaded) {
      return (

        <View style={{flex: 1, backgroundColor: Colours.sceneBackgroundColour }}>
          {this.props.children}
        </View>
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
