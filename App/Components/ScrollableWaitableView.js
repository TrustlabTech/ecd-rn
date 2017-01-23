/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import {
  ScrollView,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native'
import { Colours } from '../GlobalStyles'
const dismissKeyboard = require('dismissKeyboard')

/**
 * A scrollable view that will display an ActivityIndicator until
 * the data is available to render the screen
 * @example
 * <ScrollableWaitableView loaded={this.state.loaded}>
 *  {this.state.apiData}
 * </ScrollableWaitableView>
 */
export default class ScrollableWaitableView extends Component {

  render() {
    if (this.props.loaded) {
      return (
        <ScrollView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          scrollEnable
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets
        >

          { /* This allows us to dismiss the keyboard by tapping away */}
          <TouchableWithoutFeedback onPress={() => { dismissKeyboard() }}>
            <View style={{ flex: 1 }}>
              {this.props.children}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
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
