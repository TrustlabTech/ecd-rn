/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import { FontSizes, Colours } from '../GlobalStyles'

export default class SceneHeading extends Component {

  render() {
    return (
      <View style={{ alignItems: 'center', marginTop: 8, marginBottom: 5 }}>
        <Text style={{ color: Colours.darkText, fontSize: FontSizes.h4, fontWeight: 'bold' }}>{this.props.text}</Text>
      </View>
    )
  }
}

SceneHeading.propTypes = {
  text: React.PropTypes.string
}
