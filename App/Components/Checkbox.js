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
  }

  render() {
    const checked = this.props.checked ? 'X' : 'O'

    return (
      <View style={{flex: 1}}>

        <TouchableHighlight style={{
            marginTop: 8,
            marginBottom: 8,
            borderRadius: 5,
            width: this.props.width || null,
            height: this.props.height || 45
          }}
          onPress={ () => this.props.onPress(!this.props.checked) }
        >
          <View style={{flex: 1, flexDirection: 'row'}}>
            {/* Text */}
            <View style={{
              flex: 1
            }}>

                <Text style={{
                  color: Colours.primary,
                  fontSize: FontSizes.h5,
                  textAlign: 'left',
                  marginLeft: 10
                }}>
                  {this.props.text}
                </Text>
            </View>
            {/* Checkbox */}
            <View style={{

              borderColor: Colours.primaryLowlight,
              borderWidth: 1,
              borderStyle: 'solid',
              borderRadius: 5,
              padding: 1,
              width: this.props.height || 45
            }}>
              <View style={{
                flex:1,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text>{checked}</Text>
              </View>
            </View>
          </View>

        </TouchableHighlight>
      </View>
    )
  }
}

