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
import { FontSizes } from '../GlobalStyles'

export default class HistoryChildItem extends Component {

  render() {
    return (
      <View>
        <Text style={{ fontSize: FontSizes.p }}>{this.props.index}. {this.props.givenName} {this.props.familyName} ({this.props.className})</Text>
      </View>
    )
  }
}


HistoryChildItem.propTypes = {
  index: React.PropTypes.number,
  givenName: React.PropTypes.givenName,
  familyName: React.PropTypes.familyName,
  className: React.PropTypes.className
}
