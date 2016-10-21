import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView
} from 'react-native'

import NavBar from '../Components/NavBar'
import TextField from '../Components/TextField'
import Scene from '../Components/Scene'
import SceneView from '../Components/SceneView'

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
      <Scene>

        <NavBar
          navigator={ this.props.navigator }
          route={ this.props.route }
          title="Register"
          rightButtonText="Next"
          rightButtonAction={ this.attemptRegister }
        />

        <SceneView>
          <View style={{height: 20}}>
            <Text>{this.state.error}</Text>
          </View>

          <TextField
            ref="firstName"
            label="First Name"
            autoFocus={true}
            autoCapitalize="sentences"
          />

          <TextField
            ref="lastName"
            label="Last Name"
            autoCapitalize="sentences"
          />

          <TextField
            ref="phoneNumber"
            label="Phone number"
            keyboardType="phone-pad"
          />

          <TextField
            ref="pin"
            label="Pin"
            secureTextEntry={true}
            maxLength={4}
            keyboardType="phone-pad"
          />

          <TextField
            ref="confirmPin"
            label="Confirm Pin"
            secureTextEntry={true}
            maxLength={4}
            keyboardType="phone-pad"
          />

        </SceneView>
      </Scene>
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