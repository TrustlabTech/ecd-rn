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
  ToastAndroid,
  StyleSheet
} from 'react-native'

import TextField from '../Components/TextField'
import Button from '../Components/Button'
import SceneHeading from '../Components/SceneHeading'
import FormHeading from '../Components/FormHeading'
import Scene from '../Components/Scene'
import Config from '../Config'
import Routes from '../Routes'
import { FontSizes } from '../GlobalStyles'
import Api from '../Api'
import Sentry from '../Sentry'
import IMPLog from '../Impulse/IMPLog'
import Session from '../Session'

export default class LoginScene extends IMPComponent {

  constructor(props) {
    super(props)
    this.state = {
      serverOnline: false,
      phoneNumber: '',
      pin: ''
    }
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

  serverStatus() {
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

    this.setModal({visible: true})

    // Check for the devil
    if(phoneNumber == '666' && pin == '666'){

      Sentry.crashTheApp("El diablo!")
    } else {

      // Login to server
      Api.login(phoneNumber, pin)

      .then((data) => {

        this.setModal({visible: false})
        this.setState({pin: ''})

        // Check for error
        if(data.error) {

          Alert.alert(
            'Could not login',
            data.error,
            [{text: "Okay"}]
          )

        } else {

          // Save user info to session
          Session.update({userData: data})

          // and track her with GA
          this.props.gaTrackers.tracker1.setUser(data.user.id+' '+data.user.given_name +' ')

          // Go to main scene
          this.navigator.push({
            ...Routes.main,
            user: data.user
          })

        }
      })

      .catch((error) => {

        this.setModal({visible: false})
        this.setState({pin: ''})

        // Handle error
        if(Config.debug){
          alert(error)
          console.log(error.stack)
        } else {
          Sentry.captureEvent(error.stack, this._fileName)
          Alert.alert(
            'Unknown Error',
            "There was an error logging in.\nPlease check your internet connection.",
            [{text: "Okay"}]
          )
        }

      })
    }

    // Never overwrite with empty phone number
    if(phoneNumber != '') {

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

  footerTexts() {
    if(Config.debug) return [
      `ECD v${Config.version}`,
      `RN v${Config.rnVersion}`,
      `Server: ${Config.http.baseUrl}`,
      'Server Status: ' + (this.state.serverOnline ? "Online" : "Offiline")
    ]
    else return [
      `v${Config.version}`
    ]
  }

  makeFooter = () =>
    (<View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', padding: 10}}>
      {this.footerTexts().map( (x, i ) => (<Text key ={i} style={ss.footerText}>{x}</Text>))}
    </View>)


  render() {
    super.render()

    const { phoneNumber, pin } = this.state

    return (
      <Scene loaded={true}>
        <View style={ss.sceneViewWrapper}>

          <View style={{height: 20}}/>

          <View style={{height: 320}}>
            <SceneHeading text="ECD APP"/>

            <FormHeading text="Login"/>
            <TextField
              value={ phoneNumber }
              ref="phoneNumber"
              onChangeText={ text => this.setState({ phoneNumber: text })}
              placeholder="Phone Number"
              maxLength={10}
              keyboardType="phone-pad"
              returnKeyType="next"
              onSubmitEditing={ () => this.refs.pin.textInput.focus()}
            />

            <TextField
              value={ pin }
              ref="pin"
              onChangeText={ text => this.setState({ pin: text })}
              placeholder="PIN"
              maxLength={4}
              secureTextEntry={true}
              keyboardType="phone-pad"
              onSubmitEditing={ () => this.login() }
            />

            <View style={{flex: 1, alignItems: 'center'}}>
              <Button text="Login" onPress={ () => this.login()}/>
            </View>

          </View>

          {this.makeFooter()}

        </View>
      </Scene>
    )
  }
}

const ss = StyleSheet.create({
  footerText: {
    fontStyle: 'italic',
    fontSize: FontSizes.p
  },
  footerTextWrapperView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10
  },
  sceneViewWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})