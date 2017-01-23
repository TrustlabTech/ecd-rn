/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ToastAndroid,
  InteractionManager
} from 'react-native'
import { Colours, FontSizes } from '../GlobalStyles'
import LinearGradient from 'react-native-linear-gradient'

/**
 * A configurable button
 * @example
 * <Button text="Click me" onPress={ () => doSomething()} disabled={false}/>
 */
export default class Button extends Component {

  constructor(props) {
    super(props)
    this.bgColour1 = Colours.buttonColour1
    this.bgColour2 = Colours.buttonColour2

    this.state = {
      bgColour1: this.bgColour1,
      bgColour2: this.bgColour2
    }
    // To prevent double taps
    this.guardDelay = 500
    this.recentlyTouched = false
  }

  componentWillMount() {
    if (this.props.disabled) {
      this.setState({
        bgColour1: this.bgColour1,
        bgColour2: this.bgColour2
      })
    } else {
      this.setState({
        bgColour1: this.bgColour1,
        bgColour2: this.bgColour2
      })
    }
  }

  onPress() {
    if (!this.recentlyTouched) {
      if (this.props.disabled !== true) {
        // Executing immediately here WILL prevent animation
        setTimeout(() => {
          InteractionManager.runAfterInteractions(() => {
            this.props.onPress()
          })
        }, 0)
      } else if (this.props.disabledText) {
        ToastAndroid.show(this.props.disabledText, ToastAndroid.SHORT)
      }
      // Gaurd
      this.recentlyTouched = true
      // Ungaurd after delay
      setTimeout(() => { this.recentlyTouched = false }, this.guardDelay)
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.disabled) {
      this.setState({
        bgColour1: Colours.offWhite,
        bgColour2: '#bfbfbf'
      })
    } else {
      this.setState({
        bgColour1: '#fefefe',
        bgColour2: Colours.offWhite
      })
    }
  }

  render() {
    return (
      <View>

        <TouchableHighlight
          underlayColor={Colours.offWhite}
          activeOpacity={this.props.disabled ? 0.4 : 0.2}
          style={[styles.tH, { width: this.props.width || 140, height: this.props.height || 50 }]}
          onPress={() => this.onPress()}
        >
          <View style={styles.view}>
            <LinearGradient colors={[this.state.bgColour1, this.state.bgColour2]} style={styles.lG}>
              <Text style={[styles.text, this.props.style]}>
                {this.props.text}
              </Text>
            </LinearGradient>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tH: {
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 4
  },
  view: {
    flex: 1,
    borderColor: '#a9a9a9',
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderRadius: 4
    // paddingBottom: 0.1
  },
  lG: {
    flex: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -0.5
  },
  text: {
    color: Colours.primaryLowlight,
    fontSize: FontSizes.h5,
    textAlign: 'center'
  }
})

Button.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  text: React.PropTypes.string,
  disabledText: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onPress: React.PropTypes.func,
  style: React.PropTypes.object
}
