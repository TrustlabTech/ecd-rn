import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import { FontSizes, Colours} from '../../GlobalStyles'

export default class HistoryChildItem extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <View>
        <Text style={{fontSize: FontSizes.p}}>{this.props.index}. {this.props.givenName} {this.props.familyName} ({this.props.className})</Text>
      </View>
    )
  }
}