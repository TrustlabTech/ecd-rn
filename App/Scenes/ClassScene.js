import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'

export default class ClassScene extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props)
    return (
      <Text>{this.props.route.param}</Text>
    )
  }
}