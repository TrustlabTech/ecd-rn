import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  TextInput
} from 'react-native'

import Routes from '../Routes'
import NavBar from '../Components/NavBar'
import WaitModal from '../Components/WaitModal'
import TextField from '../Components/TextField'
import FormButton from '../Components/FormButton'
import SceneView from '../Components/SceneView'
import Scene from '../Components/Scene'
import Link from '../Components/Link'
import { FontSizes } from '../GlobalStyles'
import Config from '../Config'
const ConsentLogo = require('../Images/consent_logo.png')

export default class MainScene extends Component {

  constructor(props) {

    super(props)
    this.state = {
      phoneNumber: '',
      pin: '',
      loggedin: false,
      attempting: false,
      modalVisible: false,
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
    var modalText = ''
    if(this.state.attempting) {
      modalText = 'Loading'
    } else {
      if(this.state.error) {
        modalText = this.state.error
      }
    }
    return (
      <Scene>

        <WaitModal
          animating={ this.state.attempting }
          visible={ this.state.modalVisible }
          text={modalText}
          ref="waitmodal"
        />

        <NavBar
          navigator={ this.props.navigator }
          route={ this.props.route }
          rightButtonText="Login"
          title={ this.props.route.title }
          rightButtonAction={ () => this.attemptLogin() }
        />

        <SceneView>

          <View style={{alignItems: 'center'}}>
            <Image
              source={ConsentLogo}
              style={{width: 246, height: 273}}
            />
          </View>



          <TextField
            ref="phoneNumber"
            label="Phone Number"
            maxLength={10}
            keyboardType="phone-pad"
            returnKeyType="next"
            onSubmitEditing={ (event) => {
              console.log(this.refs.pin.textInput.focus())
            }}
          />

          <TextField
            ref="pin"
            label="Pin"
            maxLength={4}
            keyboardType="phone-pad"
            onSubmitEditing={ this.attemptLogin }
          />

          <View style={{ height: 18, alignItems: 'center' }}>
            <Text style={{fontSize: 16, color: 'red' }}>{ this.state.error }</Text>
          </View>

          <View style={{flexDirection: 'column', padding: 10, alignItems: 'center'}}>
            <Link text="Forgot your pin?" onPress={ () => alert('Boom!') }/>
          <Link text="Not yet registered?" onPress={ () => this.props.navigator.push(Routes.register) }/>
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
      </Scene>
    )
  }


  // Network
  attemptLogin = () => {

    let phoneNumber = this.refs.phoneNumber.state.value
    let pin = this.refs.pin.state.value
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
      attempting: true,
      modalVisible: true
    })


    // Initialise request
    fetch(Config.http.baseUrl + 'login.php', {
      method: 'POST',
      body: formData
    })

    // Response received
    .then((response) => {
      console.log("Response", response)
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
          attempting: false,
          modalVisible: false
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