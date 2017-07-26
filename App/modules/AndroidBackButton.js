'use-strict'

import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { BackHandler, Platform } from 'react-native'

const backButtonPressFunction = () => false

export default class AndroidBackButton extends PureComponent {
  componentDidMount() {
    Platform.OS === "android" && BackHandler.addEventListener("hardwareBackPress", this.props.onPress || backButtonPressFunction)
  }

  render() {
    /* DEBUG RENDERS => console.log('Render in ' + this.constructor.name + (this.props.context ? '          ' + this.props.context : '')) */
    return null
  }
}

AndroidBackButton.propTypes = {
  onPress: PropTypes.func
}
