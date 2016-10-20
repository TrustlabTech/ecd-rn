import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView
} from 'react-native'

import Config from '../Config'
import NavBar from '../Components/NavBar'
import TextField from '../Components/TextField'

export default class RegisterScene extends Component {

  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      pin: '',
      pinConfirm: '',
      error: null
    }
  }

  render() {
    return (
      <ScrollView style={{
        flex: 1,
        flexDirection: 'column'
      }}>

        <NavBar
          navigator={ this.props.navigator }
          route={ this.props.route }
          title="Register"
          rightButtonText="Next"
          rightButtonAction={ this.attemptRegister }
        />

        <View
        style={{
          padding: 10,
          flex: 1,
          flexDirection: 'column'
        }}
        >
          <View style={{height: 20}}>
            <Text>{this.state.error}</Text>
          </View>

          <TextField
            placeholder="First Name"
            onChangeText={ (firstName) => this.setState({ firstName }) }
          />

          <TextField
            placeholder="Last Name"
            onChangeText={ (lastName) => this.setState({ lastName }) }
          />

          <TextField
            placeholder="Phone Number"
            onChangeText={ (phoneNumber) => this.setState({ phoneNumber }) }
          />

          <TextField
            placeholder="Pin"
            onChangeText={ (pin) => this.setState({ pin }) }
            secureTextEntry={true}
            maxLength={4}
          />

          <TextField
            placeholder="Confirm Pin"
            onChangeText={ (pinConfirm) => this.setState({ pinConfirm }) }
            secureTextEntry={true}
            maxLength={4}
          />

        </View>
      </ScrollView>
    )
  }

  attemptRegister = () => {
    console.log(this.state)
    let phoneNumber = this.state.phoneNumber
    let pin = this.state.pin
    let pinConfirm = this.state.pinConfirm
    let firstName = this.state.firstName
    let lastName = this.state.lastName
    let errors = []

    this.setState({
      error: null
    })

    // Prevent attempt if a field is empty
    if(phoneNumber.length < 1) errors.push("Phone Number empty")
    if(pin.length < 1) errors.push("Pin empty")
    if(pinConfirm.length < 1) errors.push("Confirm Pin empty")
    if(firstName.length < 1) errors.push("First Name empty")
    if(lastName.length < 1) errors.push("Last Name empty")
    if(pin !== pinConfirm) errors.push("Pins do not match")

    if (errors.length > 0) {
      this.setState({
        error: errors.toString()
      })
      return
    }

  }
}