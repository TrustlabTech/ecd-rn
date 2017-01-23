/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import {
  Text,
  TouchableHighlight
} from 'react-native'

import { Colours, FontSizes } from '../GlobalStyles'

export default class Link extends Component {
  render() {
    return (
      <TouchableHighlight style={{ padding: 5, margin: 2 }} onPress={() => this.props.onPress()}>
        <Text style={{
          color: Colours.secondary,
          fontSize: FontSizes.p
        }}>
          {this.props.text}
        </Text>
      </TouchableHighlight>
    )
  }
}

Link.propTypes = {
  text: React.PropTypes.string,
  onPress: React.PropTypes.func
}
