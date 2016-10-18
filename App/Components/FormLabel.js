import React, { Component } from 'react'
import {
  Text,
  StyleSheet
} from 'react-native'

export default class FormLabel extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Text style={ styles.formLabel }>
        { this.props.text }
      </Text>
    )
  }
}

const styles = StyleSheet.create({

  formLabel: {
    fontSize: 20,
    color: 'dimgray',
    backgroundColor: 'transparent'
  }
})