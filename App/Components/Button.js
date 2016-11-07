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
  }

  render() {
    return (
      <View>

        <TouchableHighlight style={{
            marginTop: 8,
            marginBottom: 8,
            borderRadius: 5,
            width: this.props.width || 140,
            height: this.props.height || 45
          }}
          onPress={ () => this.props.onPress() }
        >
          <View style={{
            flex: 1,
            borderColor: Colours.primaryLowlight,
            borderWidth: 1,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 1
          }}>
            <LinearGradient colors={['#fefefe', Colours.offWhite ]} style={{
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

