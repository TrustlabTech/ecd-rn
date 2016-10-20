import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Modal,
  Image
} from 'react-native'

import Config from '../Config'
import Routes from '../Routes'
import NavBar from '../Components/NavBar'
import WaitModal from '../Components/WaitModal'
import TextField from '../Components/TextField'
import FormButton from '../Components/FormButton'
import SceneView from '../Components/SceneView'

const ConsentLogo = require('../Images/consent_logo.png')

export default class MainScene extends Component {

  constructor(props) {

    super(props)
    this.state = {
      phoneNumber: '',
      pin: '',
      loggedin: false,
      attempting: false,
      modalOpen: false,
      error: null
    }

  }

  componentWillReceiveProps(props) {
    this.setState({
      error: props.error || null,
      attempting: false
    })
  }

  render() {
    return (
      <View>

        <WaitModal
          visible={ this.state.attempting }
          ref="waitmodal"
        />

        <NavBar
          navigator={ this.props.navigator }
          route={ this.props.route }
          rightButtonText="Login"
          title="ECD"
          rightButtonAction={ () => this.attemptLogin() }
        />

        <SceneView>

          <View style={{alignItems: 'center'}}>
            <Image
              source={ConsentLogo}
              style={{width: 246, height: 273}}
            />
          </View>

          <View style={{ height: 18, alignItems: 'center' }}>
            <Text style={{fontSize: 16, color: 'red' }}>{ this.state.error }</Text>
          </View>

          <TextField
            placeholder="Phone Number"
            onChangeText={ (phoneNumber) => this.setState({ phoneNumber }) }
          />

          <TextField
            placeholder="Pin"
            onChangeText={ (pin) => this.setState({ pin }) }
            maxLength={4}
          />

          <View style={{padding: 10, alignItems: 'center'}}>
            <Text style={{fontSize: 28}} >or</Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <FormButton
              text="Register"
              onPress={ () => this.props.navigator.push(Routes.register) }
              height={ 70 }
              width={ 150 }
              fontSize={ 26 }
            />
          </View>

          <View>
            <TouchableHighlight onPress={ () => this.props.navigator.push(Routes.registerConfirm) } >
              <Text>RegisterConfirmScene</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={ () => this.props.navigator.replace(Routes.main)} >
              <Text>MainScene</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={ () => this.props.navigator.push(Routes.attendance) }>
              <Text>Attendance Scene</Text>
            </TouchableHighlight>
          </View>
        </SceneView>

      </View>
    )
  }


  // Network
  attemptLogin = () => {

    let phoneNumber = this.state.phoneNumber
    let pin = this.state.pin
    let errors = []

    this.setState({
      error: null
    })

    // Prevent attempt if a field is empty
    if (phoneNumber.length < 1) {
      errors.push("No phone number given")
    }

    if (pin.length < 1) {
      errors.push("No pin given")
    }

    if (errors.length > 0) {
      this.setState({
        error: errors.toString()
      })
      return
    }

    // Create form data
    var formData = new FormData()
    formData.append('phoneNumber', phoneNumber)
    formData.append('pin', pin)

    // Check if already logged in...
    if (this.state.loggedin) {
      this.setState({
        error: 'Already logged in'
      })
      return
    }

    // Bring up modal
    this.setState({
      attempting: true
    })

    // Initialise request
    fetch('http://localhost:8989/login.php', {
      method: 'POST',
      body: formData
    })

    // Response received
    .then((response) => {
      return response.json()
    })

    // Parse to JSON
    .then( (responseJson) => {
      if (responseJson.authenticated === true) {
        this.setState({
          error: null
        })
        return true
      } else {
        this.setState({
          loggedin: false,
          error: responseJson.error
        })
        return false
      }
    })

    .then((success) => {

      if (success) {
        // Login complete, change scene
        this.setState({
          loggedin: true,
          attempting: false
        })
        this.props.navigator.replace(Routes.main)
      } else {
        this.setState({
          attempting: false,
          error: "Invalid Phone Number or Pin"
        })
      }

    })

    // On reject
    .catch( (error) => {
      console.log('LoginScene:attempt', error)
      this.setState({
        error: "Network error ",
        attempting: false
      })
    })
  }
}