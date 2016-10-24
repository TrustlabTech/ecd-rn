import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'

export default class DateText extends Component {

  constructor(props) {
    super(props)
    this.state = {
      date: this.getDate()
    }
  }


  getDate(){
    let D = new Date()
    let day = D.getDate()
    let month = D.getMonth()
    let year = D.getFullYear()
    return day + "/" + month + "/" + year
  }

  render() {
    return (
      <Text>Now: {this.getDate()}</Text>
    )
  }
}