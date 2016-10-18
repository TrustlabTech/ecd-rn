import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput
} from 'react-native'

export default class TextField extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: props.value
    }
  }

  render() {
    return (
      <View>
        <TextInput
          onChangeText={ this.props.onChangeText }
          value={ this.state.value }
          placeholder={ this.props.placeholder }
          secureTextEntry= { this.props.secureTextEntry }
        />
      </View>
    )
  }
}