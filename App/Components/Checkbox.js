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
    const checked = this.props.checked ? 'X' : ''

    return (
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5, height: 45 }}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>

          {/* Text */}
          <View style={{ flex: 1 }}>

            <Text style={{ color: Colours.primary, fontSize: FontSizes.h5, textAlign: 'left', marginLeft: 10 }}>
              {this.props.text}
            </Text>
          </View>

          {/* Checkbox */}
          <TouchableHighlight
            onPress={ () => this.props.onPress(!this.props.checked) }
            style={{
              borderRadius: 5
            }}
          >
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderColor: Colours.primaryLowlight, borderWidth: 1, borderStyle: 'solid', borderRadius: 5, padding: 1, width: this.props.height || 45, height: 45 }}>
              <Text>{checked}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}