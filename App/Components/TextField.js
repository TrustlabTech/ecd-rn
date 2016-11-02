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
  }

  componentWillReceiveProps(nextProps, nextState) {

  }

  render() {
    return (
      <View
        style={{
          paddingLeft: 5,
          paddingRight: 5,
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Text style={{padding: 5,fontSize: 16, color: Colours.primaryLowlight}}>
          { this.props.label }
        </Text>
        <View
          style={{
            flex: 1,
            backgroundColor: Colours.offWhite,
            borderRadius: 5,
          }}
        >

          <TextInput
            ref={ (ref) => this.textInput = ref }
            style={{backgroundColor: 'red'}}
            onSubmitEditing={ this.props.onSubmitEditing || null }
            returnKeyType={ this.props.returnKeyType || "done" }
            autoCapitalize={ this.props.autoCapitalize || "none" }
            keyboardType={ this.props.keyboardType || "default" }
            onChangeText={ (text) => this.props.onChangeText(text) || null }
            value={ this.props.value }
            placeholder={ this.props.placeholder || null }
            secureTextEntry={ this.props.secureTextEntry || false }
            blurOnSubmit={ this.props.blurOnSubmit || false }
            maxLength={ this.props.maxLength || 20 }
            autoFocus={ this.props.autoFocus || false }
            style={{
              marginLeft: 5,
              marginRight: 5,
              fontSize: this.props.fontSize || FontSizes.h5,
              height: this.props.height || 50,
            }}
          />
        </View>
      </View>
    )
  }
}