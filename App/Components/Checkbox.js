import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import { Colours, FontSizes } from '../GlobalStyles'
import LinearGradient from 'react-native-linear-gradient'

export default class Checkbox extends Component {

  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }

  render() {
    const checked = this.state.checked ? 'X' : 'O'

    return (
      <View>

        <TouchableHighlight style={{
            marginTop: 8,
            marginBottom: 8,
            borderRadius: 5,
            width: this.props.width || null,
            height: this.props.height || 45
          }}
          onPress={ () => this.props.onPress() }
        >
          <View style={{flex: 1, flexDirection: 'row'}}>
            {/* Text */}
            <View style={{
              flex: 1
            }}>

                <Text style={{
                  color: Colours.primary,
                  fontSize: FontSizes.h5,
                  textAlign: 'center'
                }}>
                  {this.props.text}
                </Text>
            </View>
            {/* Checkbox */}
            <View style={{
              flex:1 ,
              alignItems: 'center',
              borderColor: Colours.primaryLowlight,
              borderWidth: 1,
              borderStyle: 'solid',
              borderRadius: 5,
              padding: 1
            }}>
              <View>
                <Text>{checked}</Text>
              </View>
            </View>
          </View>

        </TouchableHighlight>
      </View>
    )
  }
}

