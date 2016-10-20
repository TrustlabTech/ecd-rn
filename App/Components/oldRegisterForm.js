import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native'
import SceneHeading from './SceneHeading'
import FormLabel from './FormLabel'
import GlobalStyles from '../GlobalStyles'
import TextField from '../Components/TextField'

export default class RegisterForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      firstName: null,
      lastName: null,
      phoneNumber: null,
      pin: null,
      pinConfirm: null,
      attempting: false
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      error: props.error || null,
      pinConfirm: null,
      attempting: false
    })
  }

  render() {
    return (
      
    )
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 20
  }
})