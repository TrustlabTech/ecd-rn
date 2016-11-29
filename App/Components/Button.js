import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ToastAndroid
} from 'react-native'
import { Colours, FontSizes } from '../GlobalStyles'
import LinearGradient from 'react-native-linear-gradient'

export default class Button extends Component {

  constructor(props) {
    super(props)

    this.state = {
      bgColour1: '#fefefe',
      bgColour2: Colours.offwhite,
    }
    this.gaurdDelay = 500
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

        // Blocking here will prevent animation
        setTimeout(() => this.props.onPress(),0)

      } else {

        // If a message was given display it
        if(this.props.disabledText)
          ToastAndroid.show(this.props.disabledText, ToastAndroid.SHORT);

      }
      this.recentlyTouched = true
      setTimeout(() => this.recentlyTouched = false ,this.gaurdDelay)
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
              <Text style={styles.text}>
                {this.props.text}
              </Text>
            </LinearGradient>
          </View>

        </TouchableHighlight>

      </View>
    )
  }
}

var styles = StyleSheet.create({
  tH: {
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5
  },
  view: {
    flex: 1,
    borderColor: Colours.primaryLowlight,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 1
  },
  lG: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text : {
    color: Colours.primary,
    fontSize: FontSizes.h5,
    textAlign: 'center'
  }
})
