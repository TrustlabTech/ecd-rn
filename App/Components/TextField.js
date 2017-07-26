/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput
} from 'react-native'

import { Colours, FontSizes } from '../GlobalStyles'

export default class TextField extends Component {

  render() {
    let label = null
    if (this.props.label) {
      label =
        (<Text style={{ padding: 5, fontSize: 16, color: Colours.primaryLowlight }}>
          { this.props.label }
        </Text>)
    }

    return (
      <View
        style={{
          paddingLeft: 5,
          paddingRight: 5,
          justifyContent: 'center',
          marginTop: 8,
          marginBottom: 8
        }}
      >
        {label}
        <View
          style={{
            borderColor: Colours.primaryLowlight,
            backgroundColor: 'white',
            borderRadius: 5,
            borderWidth: 1,
            borderStyle: 'solid',
            height: this.props.height || 50,
            width: this.props.width || null
          }}
        >

          <TextInput
            ref={(ref) => { this.textInput = ref }}
            onSubmitEditing={this.props.onSubmitEditing || null}
            returnKeyType={this.props.returnKeyType || 'done'}
            autoCapitalize={this.props.autoCapitalize || 'none'}
            keyboardType={this.props.keyboardType || 'default'}
            onChangeText={(text) => this.props.onChangeText(text) || null}
            value={this.props.value}
            placeholder={this.props.placeholder || null}
            secureTextEntry={this.props.secureTextEntry || false}
            blurOnSubmit={this.props.blurOnSubmit || false}
            maxLength={this.props.maxLength || 20}
            autoFocus={this.props.autoFocus || false}
            selectTextOnFocus={this.props.selectTextOnFocus || true}
            style={{
              marginLeft: 5,
              marginRight: 5,
              fontSize: this.props.fontSize || FontSizes.h5
            }}
          />
        </View>
      </View>
    )
  }
}

TextField.propTypes = {
  onSubmitEditing: PropTypes.func,
  returnKeyType: PropTypes.string,
  autoCapitalize: PropTypes.string,
  keyboardType: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  blurOnSubmit: PropTypes.bool,
  maxLength: PropTypes.number,
  autoFocus: PropTypes.bool,
  selectTextOnFocus: PropTypes.bool,
  fontSize: PropTypes.number,
  onChangeText: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number
}
