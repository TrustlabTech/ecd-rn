import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'

export default class HistoryChildItem extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <View>
        <Text>{this.props.givenName} {this.props.familyName} ({this.props.className})</Text>
      </View>
    )
  }
}