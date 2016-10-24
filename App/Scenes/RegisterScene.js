import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView
} from 'react-native'

import NavBar from '../Components/NavBar'
import TextField from '../Components/TextField'
import Scene from '../Components/Scene'
import SceneView from '../Components/SceneView'
import WaitModal from '../Components/WaitModal'
import Config from '../Config'
import Routes from '../Routes'

export default class RegisterScene extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: null,
      attempting: false,
      modalVisible: false
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      error: null,
      attempting: false
    })
  }

  render() {
    return (
      <Scene>

        <WaitModal
          animating={ this.state.attempting }
          visible={ this.state.modalVisible }
          text={ this.state.error ? this.state.error : "Registering" }
          ref="waitmodal"
        />
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
            returnKeyType="next"
            onSubmitEditing={ (event) =>
              this.refs.lastName.textInput.focus()
            }
          />

          <TextField
            ref="lastName"
            label="Last Name"
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={ event =>
              this.refs.phoneNumber.textInput.focus()
            }
          />

          <TextField
            ref="phoneNumber"
            label="Phone number"
            keyboardType="phone-pad"
            returnKeyType="next"
            onSubmitEditing={ event =>
              this.refs.pin.textInput.focus()
            }
          />

          <TextField
            ref="pin"
            label="Pin"
            secureTextEntry={true}
            maxLength={4}
            keyboardType="phone-pad"
            returnKeyType="next"
            onSubmitEditing={ event =>
              this.refs.pinConfirm.textInput.focus()
            }
          />

          <TextField
            ref="pinConfirm"
            label="Confirm Pin"
            secureTextEntry={true}
            maxLength={4}
            keyboardType="phone-pad"
            onSubmitEditing={ this.attemptRegister }
          />

        </SceneView>
      </Scene>
    )
  }

  attemptRegister = () => {
    let phoneNumber = this.refs.phoneNumber.state.value
    let pin = this.refs.pin.state.value
    let pinConfirm = this.refs.pinConfirm.state.value
    let firstName = this.refs.firstName.state.value
    let lastName = this.refs.lastName.state.value
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

    // Create form data
    var formData = new FormData()
    formData.append('phoneNumber',phoneNumber)
    formData.append('pin', pin)
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)

    // Show the modal
    this.setState({
      attempting: true,
      modalVisible: true,
      error: null
    })

    fetch(Config.http.baseUrl + 'register.php',{
      method: 'POST',
      body: formData
    })

    .then((response) => {
      return response.json()
    })

    .then( (responseJson) => {
      console.log(responseJson)
      if(responseJson.authenticated === true) {
        return true
      } else {
        this.setState({
          error: responseJson.error
        })
        return false
      }
    })

    .then( (success) => {
      if(success) {
        console.log("Success")
        this.setState({
          attempting: false,
          modalVisible: false
        })
        this.props.navigator.replace(Routes.registerConfirm)
      } else {
        console.log("Failure")
        this.setState({
          attempting: false,
          error: "Registration invalid"
        })
      }
    })

    // On reject
    .catch( (error) => {
      console.log('RegisterScene:attempt', error)
      this.setState({
        error: "Network error",
        attempting: false
      })
    })
  }
}