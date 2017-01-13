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

    this.state = {
      bgColour1: '#fefefe',
      bgColour2: Colours.offwhite,
    }
    // To prevent double taps
    this.guardDelay = 500
    this.recentlyTouched = false

  }

  componentWillMount() {
    if(this.props.disabled) {
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

  onPress() {
    if(!this.recentlyTouched) {
      if(this.props.disabled !== true) {

        setTimeout(() => {
          InteractionManager.runAfterInteractions( () => {
            // Executing immediately here WILL prevent animation
            // setTimeout(() => this.props.onPress(),1)
            // setTimeout(() => this.props.onPress(),0)
            this.props.onPress()
          })
        },0)

      } else {

        // If a message was given display it
        if(this.props.disabledText)
          ToastAndroid.show(this.props.disabledText, ToastAndroid.SHORT);

      }

      // Gaurd
      this.recentlyTouched = true
      // Ungaurd after delay
      setTimeout(() => this.recentlyTouched = false ,this.guardDelay)
    }

  }

  componentWillReceiveProps(nextProps, nextState) {
    if(this.props.disabled) {
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

          activeOpacity={this.props.disabled ? 0.4: 0.2}

          style={[styles.tH, { width: this.props.width || 140, height: this.props.height || 45 }]}

          onPress={ () => this.onPress() }
        >

          <View style={styles.view}>
            <LinearGradient colors={[this.state.bgColour1, this.state.bgColour2 ]} style={styles.lG}>
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
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 4
  },
  view: {
    flex: 1,
    borderColor: Colours.primaryLowlight,
    borderWidth: 0.8,
    borderStyle: 'solid',
    borderRadius: 4,
    paddingBottom: 0.1
  },
  lG: {
    flex: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text : {
    color: Colours.primary,
    fontSize: FontSizes.h5,
    textAlign: 'center'
  }
})
