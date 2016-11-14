import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import { Colours, FontSizes } from '../GlobalStyles'
import LinearGradient from 'react-native-linear-gradient'

export default class Button extends Component {

  constructor(props) {
    super(props)
    if(this.props.disabled){
      this.bgColour1 = Colours.offWhite
      this.bgColour2 = '#bfbfbf'
    } else {
      this.bgColour1 = '#fefefe'
      this.bgColour2 = Colours.offWhite
    }
  }

  onPress(id) {
    if(this.props.disabled !== true) {
      this.props.onPress()
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.disabled){
      this.bgColour1 = Colours.offWhite
      this.bgColour2 = '#bfbfbf'
    } else {
      this.bgColour1 = '#fefefe'
      this.bgColour2 = Colours.offWhite
    }
  }

  render() {
    return (
      <View>

        <TouchableHighlight
          activeOpacity={this.props.disabled ? 1: 0.2}
          style={{
            marginTop: 8,
            marginBottom: 8,
            borderRadius: 5,
            width: this.props.width || 140,
            height: this.props.height || 45
          }}
          onPress={ () => this.onPress() }
        >
          <View style={{
            flex: 1,
            borderColor: Colours.primaryLowlight,
            borderWidth: 1,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 1
          }}>
            <LinearGradient colors={[this.bgColour1, this.bgColour2 ]} style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{
                color: Colours.primary,
                fontSize: FontSizes.h5,
                textAlign: 'center'
              }}>
                {this.props.text}
              </Text>
            </LinearGradient>
          </View>

        </TouchableHighlight>
      </View>
    )
  }
}

