/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import {
  View,
  ActivityIndicator
} from 'react-native'
import { Colours } from '../GlobalStyles'

export default class ScrollableWaitableView extends Component {

  render() {
    if (this.props.loaded) {
      return (

        <View style={{ flex: 1, backgroundColor: Colours.sceneBackgroundColour }}>
          {this.props.children}
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colours.sceneBackgroundColour }}>
          <ActivityIndicator
            animating
            style={{ height: 80 }}
            size="large"
          />
        </View>
      )
    }
  }
}


ScrollableWaitableView.propTypes = {
  loaded: React.PropTypes.bool,
  children: React.PropTypes.array
}
