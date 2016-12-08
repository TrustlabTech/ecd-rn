/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import IMPComponent from '../Impulse/IMPComponent'
import { bindActionCreators } from 'redux'
import {
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  Alert,
  ToastAndroid
} from 'react-native'

import TextField from '../Components/TextField'
import Button from '../Components/Button'
import SceneHeading from '../Components/SceneHeading'
import FormHeading from '../Components/FormHeading'
import Scene from '../Components/Scene'
import Config from '../Config'
import Routes from '../Routes'
import { connect } from 'react-redux'
import * as loginActions from '../Actions/Login'
import * as appActions from '../Actions/App'
import { FontSizes } from '../GlobalStyles'
import { ModalMode } from '../Components/WaitModal'
import Api from '../Api'
import Sentry from '../Sentry'
import IMPLog from '../Impulse/IMPLog'
import Session from '../Session'
import _ from 'lodash'
import { add } from 'lodash/fp'

class LoginScene extends IMPComponent {

  constructor(props) {
    super(props)
    this.state = {
      serverOnline: false,
      phoneNumber: "",
      pin: ""
    }
  }

  componentWillFocus() {
    super.componentWillFocus()

  }

  componentDidFocus() {
    super.componentDidFocus()

  }

  componentWillMount() {
    super.componentWillMount()
    this.serverStatus()


    // Load phone number from persistent storage
    AsyncStorage.getItem('@phoneNumber', (error, phoneNumber) => {

      if(!error){
        this.setState({phoneNumber: phoneNumber})
        if(Config.debug) {
          IMPLog.async('[AS]', `Loaded ${phoneNumber} from Async storage`)
        }

      } else {
        const errorMessage = 'Could not load stored phone number from devices. This is normal if it is the first time.'
        if(Config.debug) {
          IMPLog.async('[AS]', errorMessage + error.toString())
        } else {
          Sentry.addBreadcrumb(this._className, errorMessage + error.toString())
        }
      }
    })

  }

  componentDidMount() {
    super.componentDidMount()
  }

  componentWillReceiveProps() {
    super.componentWillReceiveProps()
  }

  componentWillUnmount() {
    super.componentWillUnmount()
  }

  serverStatus = () => {
    fetch('http://ecd.cnsnt.io')
    .then((response) => {
      this.setState({serverOnline: true})
    })
    .catch((error) => {
      this.setState({serverOnline: false})
    })
  }

  login() {


    Sentry.addNavigationBreadcrumb(this._className, this._className, "MainScene")

    const { phoneNumber, pin } = this.state


    // Open modal
    this.setModal({visible: true})


    // Check for the devil
    if(phoneNumber == '666' && pin == '666'){

      // The dark one
      Sentry.crashTheApp("El diablo!")
    } else {

      // Login through REST
      Api.login(phoneNumber, pin).then((data) => {

        // Hide the modal
        this.setModal({visible: false})
        // Reset pin
        this.setState({pin: ''})

        // Check for error
        if(data.error) {

          Alert.alert(
            'Could not login',
            data.error,
            [
              {text: "Okay"}
            ]
          )

        } else {

          // Push user info into redux store
          this.props.dispatch(appActions.setUser(data))
          Session.update({userData: data})

          // Go to main scene
          this.navigator.push(Routes.main)

        }
      }).catch((error) => {

        // Close the modal
        this.setModal({visible: false})
        // Reset pin
        this.setState({pin: ''})

        // Handle error
        if(Config.debug){
          alert(error)
          console.log(error.stack)
        } else {
          Sentry.captureEvent(error.stack, this.Filename)
          Alert.alert(
            'Unknown Error',
            "There was an error logging in.\nPlease check your internet connection.",
            [
              {text: "Okay"}
            ]
          )
        }

      })
    }

    // Never overwrite with empty phone number
    if(phoneNumber != "") {

      // Put phone number in persistant storage
      AsyncStorage.setItem('@phoneNumber',  phoneNumber,(error) => {

        const errorMessage = 'Could not store phone number with Async storage'
        const successMessage = `Phone number ${phoneNumber} stored to Async storage`
        if(error) {

          if(Config.debug) {
            IMPLog.async(this._className, errorMessage + error.toString())

          } else {
            Sentry.captureEvent(errorMessage + error.toString(), this._className )
          }
        } else {
          IMPLog.async(this._className, successMessage)
        }
      })
    }


  }

  render() {
    super.render()

    const { phoneNumber, pin } = this.state
    let footer = <Text style={{fontStyle: 'italic', fontSize: FontSizes.p}}>ECD v{Config.version}</Text>

    if(Config.debug) {
      footer =
        <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', padding: 10}}>
          <Text style={{fontStyle: 'italic', fontSize: FontSizes.p}}>ECD v{Config.version}</Text>
          <Text style={{fontStyle: 'italic', fontSize: FontSizes.p}}>RN v{Config.rnVersion}</Text>
          <Text style={{fontStyle: 'italic', fontSize: FontSizes.p}}>Server: {Config.http.baseUrl}</Text>
          <Text style={{fontStyle: 'italic', fontSize: FontSizes.p}}>Server Status: {this.state.serverOnline ? "Online" : "Offline"}</Text>
        </View>
    } else {
      footer =
        <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', padding: 10}}>
          <Text style={{fontStyle: 'italic', fontSize: FontSizes.p}}>ECD v{Config.version}</Text>
        </View>
    }

    return (
      <Scene loaded={true}>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
          <View style={{height: 20}}/>
          <View style={{height: 320}}>
            <SceneHeading text="ECD APP"/>

            <FormHeading text="Login"/>
            <TextField
              value={ phoneNumber }
              ref="phoneNumber"
              onChangeText={ (text) => this.setState({ phoneNumber: text }) }
              placeholder="Phone Number"
              maxLength={10}
              keyboardType="phone-pad"
              returnKeyType="next"
              onSubmitEditing={ () => this.refs.pin.textInput.focus() }
            />

            <TextField
              value={ pin }
              ref="pin"
              onChangeText={ (text) => this.setState({ pin: text }) }
              placeholder="PIN"
              maxLength={4}
              secureTextEntry={true}
              keyboardType="phone-pad"
              onSubmitEditing={ () => this.login() }
            />
            <View style={{flex: 1, alignItems: 'center'}}>
              <Button text="Login" onPress={() => this.login()}/>
            </View>
          </View>
          {footer}
        </View>
      </Scene>
    )
  }
}

export default connect(
  (state) => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(loginActions, dispatch)
  })
)(LoginScene)