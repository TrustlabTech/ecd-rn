import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'

export default class ChildScene extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Text>Good day!</Text>
    )
  }
}