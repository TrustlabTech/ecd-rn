import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native'

import { Colours, FontSizes } from '../GlobalStyles'

export default class TextField extends Component {

  constructor(props) {
    super(props)

    this.state = {
      // value: ''
    }
  }

  render() {
    return (
      <View
        style={{
          padding: 10
        }}
      >
      <View
        style={{
          height: this.props.height || 50,
          width: this.props.width || null,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colours.offWhite,
          borderRadius: 5,
        }}
      >
        <TextInput
          onChangeText={ this.props.onChangeText }
          value={ this.state.value }
          placeholder={ this.props.placeholder || "..." }
          secureTextEntry= { this.props.secureTextEntry || false }
          maxLength={this.props.maxLength || 20 }
          style={{
            fontSize: this.props.fontSize || FontSizes.h3,
            marginLeft: 10,
            height: this.props.height || 50
          }}
        />
      </View>
      </View>
    )
  }
}