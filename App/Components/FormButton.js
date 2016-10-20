import React, { Component } from 'react'
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet
} from 'react-native'

/* Props:
 * text: string
 * onPress: function
 * height: number
 * width: number
 */
export default class FormButton extends Component {

  constructor(props) {
    super(props)
    this.height = props.height || null
    this.width = props.width || null
  }

  render() {

    return (
      <View style={{padding: 5}} >
        <TouchableHighlight
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ff9215',
            borderRadius: 3,
            width: this.props.width || 120,
            height: this.props.height || 50
          }}
          onPress={ this.props.onPress }
        >
          <Text style={{
            fontSize: 20 || props.fontSize,
            color: 'white'
          }}>
            { this.props.text }
          </Text>

        </TouchableHighlight>
      </View>
    )
  }
}