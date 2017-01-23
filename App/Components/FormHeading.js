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

export default class FormHeading extends Component {

  render() {
    return (
      <View style={{ marginTop: 5, marginBottom: 5, marginLeft: 25 }}>
        <Text style={{ color: Colours.darkText, fontWeight: 'bold', fontSize: FontSizes.h5 }}>{this.props.text}</Text>
      </View>
    )
  }
}

FormHeading.propTypes = {
  text: React.PropTypes.string
}
