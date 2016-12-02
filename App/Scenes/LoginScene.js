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
  Alert
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

class LoginScene extends IMPComponent {

  FILENAME = 'LoginScene.js'

  constructor(props) {
    super(props)
    this.state = {
      serverOnline: false
    }
  }

  componentWillFocus(event) {
    super.componentWillFocus(event)
  }

  componentDidFocus(event) {
    super.componentDidFocus(event)
  }

  componentWillMount() {
    super.componentWillMount()

    this.props.navigator.navigationContext.addListener('willfocus', this.componentWillFocus.bind(this))
    this.props.navigator.navigationContext.addListener('didfocus', this.componentDidFocus.bind(this))


    this.serverStatus()

    if(!Config.debug) {
      // Production mode
      Sentry.addBreadcrumb(this.FILENAME,'componentWillMount')
      this.props.gaTrackers.tracker1.trackScreenView(this.FILENAME)
    }

    // Load phone number from persistant storage
    AsyncStorage.getItem('@phoneNumber', (error, result) => {
      if(!error)
        this.props.actions.phoneNumberTextChange(result)
      else
        Sentry.addBreadcrumb('LoginScene','Failed to load phone number from Async storage')
    })
  }

  componentWillReceiveProps() {
    super.componentWillReceiveProps()
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    // this.props.navigator.navigationContext.removeListener('willfocus')
    // this.props.navigator.navigationContext.removeListener('didfocus')

  }

  login() {

    Sentry.addNavigationBreadcrumb(this.FILENAME+":login()", "LoginScene", "MainScene")

    // From Redux
    const { phoneNumber, pin } = this.props.state.Login


    // Open modal
    this.props.dispatch(appActions.setModal({
      modalVisible: true,
      modalText: "Logging in",
      modalMode: ModalMode.WAITING
    }))

    // Reset pin
    this.props.actions.pinTextChange('')

    // Check for the devil
    if(phoneNumber == '666' && pin == '666'){

      // The dark one
      Sentry.crashTheApp("El diablo!")
    } else {

      // Login through REST
      Api.login(phoneNumber, pin).then((data) => {

        // Hide the modal
        this.props.dispatch(appActions.setModal({
          modalVisible: false
        }))

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

          // Go to main scene
          this.props.navigator.replace(Routes.main)
        }
      }).catch((error) => {

        // Close the modal
         this.props.dispatch(appActions.setModal({
          modalVisible: false
        }))

        // Handle error
        if(Config.debug){
          alert(error)
          console.log(error.stack)
        } else {
          Sentry.captureEvent(error.stack, this.FILENAME)
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

    // Put phone number in persistant storage
    AsyncStorage.setItem('@phoneNumber',phoneNumber,(error) => {
      if(error) {

        if(Config.debug)
          console.log('Could not store phone number')
        else
          Sentry.captureEvent('Could not store number with Async storage', this.FILENAME )

      } else {
        if(Config.debug) console.log('Phone number stored ' + phoneNumber)
      }
    })

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

  render() {
    super.render()

    const { phoneNumber, pin } = this.props.state.Login
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
      <Scene>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
          <View style={{height: 20}}/>
          <View style={{height: 320}}>
            <SceneHeading text="ECD APP"/>

            <FormHeading text="Login"/>
            <TextField
              value={ phoneNumber }
              ref="phoneNumber"
              onChangeText={ (text) => this.props.actions.phoneNumberTextChange(text) }
              placeholder="Phone Number"
              maxLength={10}
              keyboardType="phone-pad"
              returnKeyType="next"
              onSubmitEditing={ () => this.refs.pin.textInput.focus() }
            />

            <TextField
              value={ pin }
              ref="pin"
              onChangeText={ (text) => this.props.actions.pinTextChange(text) }
              placeholder="PIN"
              maxLength={4}
              secureTextEntry={true}
              keyboardType="phone-pad"
              onSubmitEditing={ () => this.login() }
              width={ this.screenWidth * 0.6 }
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