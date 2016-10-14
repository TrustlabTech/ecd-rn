import React, { Component } from 'react'
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet
} from 'react-native'

/* Supported props
 *
 * text:string
 * onPress: function
 * height: number
 * width: number
 */
export default class FormButton extends Component {

  constructor(props) {
    super(props)
    this.height = props.height || null
    this.width = props.width || null
    console.log('height', this.height, 'width', this.width)
  }

  render() {
    var tcStyles = [styles.touchable]
    if (this.width) tcStyles.push({ width: this.width })
    if (this.height) tcStyles.push({ height: this.height })
    return (
      <View style={styles.view}>
        <TouchableHighlight
          style={tcStyles}
          onPress={this.props.onPress}
        >
          <Text style={styles.text}>{this.props.text}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    padding: 5
  },
  touchable: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff9215',
    borderRadius: 3,

  },
  text: {
    fontSize: 16,
    color: 'white'
  }
})