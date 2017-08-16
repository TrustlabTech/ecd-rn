/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

'use-strict'

// base libs
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native'
import { COLORS } from '../constants' 

export default class Button extends Component {
  render() {

    if (Platform.OS === 'ios' || Platform.Version <= 20 || this.props.nativeFeedback === false)
      return (
        <TouchableOpacity 
          {...this.props}
          style={[styles.iosStyle, this.props.style]}>
            {this.props.children}
        </TouchableOpacity>
      )

    if (Platform.OS === 'android')
      return (
        <TouchableNativeFeedback
          {...this.props}
          style={[styles.androidStyle, this.props.style]}
          background={TouchableNativeFeedback.Ripple(this.props.rippleColor, false)}>
          <View style={[styles.androidStyle, this.props.style]}>
            {this.props.children}
          </View>
        </TouchableNativeFeedback>
    )
  }
}

Button.defaultProps = {
  rippleColor: COLORS.lightGrey,
  nativeFeedback: false,
  style: {},
}

Button.propTypes = {
  ...TouchableOpacity.propTypes,
  ...TouchableNativeFeedback.propTypes,
  rippleColor: PropTypes.string.isRequired,
  nativeFeedback: PropTypes.bool.isRequired,
}

const commonStyle = {
  padding: 6,
}

const styles = StyleSheet.create({
  iosStyle: {
    ...commonStyle,
  },
  androidStyle: {
    ...commonStyle,
  },
})
