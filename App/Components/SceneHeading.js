import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { FontSizes } from '../GlobalStyles'

export default class SceneHeading extends Component {

  render() {
    return (
      <View style={{alignItems: 'center', marginTop: 20, marginBottom: 20}}>
        <Text style={{fontSize: FontSizes.h4, fontWeight: 'bold'}}>{this.props.text}</Text>
      </View>
    )
  }
}
