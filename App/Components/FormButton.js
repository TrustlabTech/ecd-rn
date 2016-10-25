import React, { Component } from 'react'
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet
} from 'react-native'

import { Colours } from '../GlobalStyles'
/* Props:
 * text: string
 * onPress: function
 * height: number
 * width: number
 */
export default class FormButton extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
        <TouchableHighlight
          style={{
            flex: 1,
            marginTop: 3,
            marginBottom: 3,
            backgroundColor: '#000000',
            borderRadius: 3,
            width: this.props.width || 120,
            height: this.props.height || 50
          }}
          onPress={ this.props.onPress }
        >
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colours.secondary,
            padding: 5,
            borderRadius: 3
          }}>
            <Text style={{
              fontSize: 20 || props.fontSize,
              color: 'white'
            }}>
              { this.props.text }
            </Text>
          </View>

        </TouchableHighlight>
    )
  }
}