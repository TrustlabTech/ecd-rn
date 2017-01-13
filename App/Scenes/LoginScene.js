/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import IMPComponent from '../Impulse/IMPComponent'
import IMPLog from '../Impulse/IMPLog'
import AndroidBackButton from 'react-native-android-back-button'
import {
  Text,
  View,
  AsyncStorage,
  Alert,
  StyleSheet
} from 'react-native'

import Config from '../Config'
import Routes from '../Routes'
import { FontSizes, Colours } from '../GlobalStyles'
import Api from '../Api'
import Sentry from '../Sentry'
import Session from '../Session'

import {
  ScrollableWaitableView,
  SceneHeading,
  FormHeading,
  TextField,
  Button
} from '../Components'

/**
 * A scene allowing users to login using their phone number and pin
 * @extends IMPComponent
 */
export default class LoginScene extends IMPComponent {

  constructor(props) {
    super(props)
    if(Config.debug && Config.debugAutoLogin) {
      this.state = {
        serverOnline: false,
        phoneNumber: '0000',
        pin: '0000'
      }
      setTimeout(() => this._login(),100)
    } else {
      this.state = {
        serverOnline: false,
        phoneNumber: '',
        pin: ''
      }
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
          IMPLog.async(`Loaded ${phoneNumber} from Async storage`)
        }
      } else {
        const errorMessage = 'Could not load stored phone number from devices. This is normal if it is the first time.'
        if(Config.debug) {
          IMPLog.async(errorMessage + error.toString())
        } else {
          Sentry.addBreadcrumb(this._className, errorMessage + error.toString())
        }
      }
    })

  }

  /**
   * Check if the server is online
   * @returns {undefined}
   */
  serverStatus() {
    fetch(Config.http.baseUrl)
    .then((response) => {
      this.setState({serverOnline: true})
    })
    .catch((error) => {
      this.setState({serverOnline: false})
    })
  }

  /**
   * Log the user in
   * @returns {undefined}
   */
  _login() {

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
          IMPLog.error(data.error, this._fileName)
          Alert.alert(
            Config.errorMessage.login.title,
            data.error,
            [{text: "Okay"}]
          )

        } else {

          // Save user info to session
          Session.update({userData: data})

          // and track her with GA
          this.props._gaTrackers.tracker1.setUser(data.user.id+' '+data.user.given_name +' ')

          // Go to main scene
          this.navigator.push({
            ...Routes.main,
            user: data.user,
            token: data._token
          })
        }
      })

      .catch((error) => {

        this.setModal({visible: false})
        this.setState({pin: ''})

        // Handle error
        if(Config.debug){
          IMPLog.error(error.toString(), this._fileName)
        } else {
          Sentry.captureEvent(error.stack, this._fileName)
        }

        Alert.alert(
          Config.errorMessage.network.title,
          Config.errorMessage.network.message,
          [{text: "Okay"}]
        )

      })
    }

    // Never overwrite with empty phone number
    if(phoneNumber !== '') {

      // Put phone number in persistant storage
      AsyncStorage.setItem('@phoneNumber',  phoneNumber,(error) => {

        if(error) {

          if(Config.debug) {
            IMPLog.async('Could not store phone number with Async storage' + error.toString())

          } else {
            Sentry.captureEvent(errorMessage + error.toString(), this._className )
          }
        } else {
          IMPLog.async(`Phone number ${phoneNumber} stored to Async storage`)
        }
      })
    }


  }

  /**
   * Get the information to be displayed in the footer
   * @returns {Array} The text items to display
   */
  footerTexts = () =>
    Config.debug ?
      [
        `ECD v${Config.version}`,
        `RN v${Config.rnVersion}`,
        `Server: ${Config.http.baseUrl}`,
        'Server Status: ' + (this.state.serverOnline ? "Online" : "Offline")
      ]
    :
      [ `v${Config.version}` ]


  makeFooter = () =>
    (<View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', padding: 10}}>
      {this.footerTexts().map( (x, i ) => (<Text key ={i} style={ss.footerText}>{x}</Text>))}
    </View>)


  render() {
    super.render()

    const { phoneNumber, pin } = this.state

    return (
      <ScrollableWaitableView loaded={true}>
        <AndroidBackButton onPress={ () => false }/>
        <View style={ss.sceneViewWrapper}>

          <View style={{height: 20}}/>

          <View style={{height: 320}}>
            <SceneHeading text={ Config.appName.toUpperCase() }/>

            <FormHeading text="Login"/>
            <TextField
              value={ phoneNumber }
              ref="phoneNumber"
              onChangeText={ text => this.setState({ phoneNumber: text }) }
              placeholder="Phone Number"
              maxLength={10}
              keyboardType="phone-pad"
              returnKeyType="next"
              onSubmitEditing={ () => this.refs.pin.textInput.focus() }
            />

            <TextField
              value={ pin }
              ref="pin"
              onChangeText={ text => this.setState({ pin: text }) }
              placeholder="PIN"
              maxLength={4}
              secureTextEntry={true}
              keyboardType="phone-pad"
              onSubmitEditing={ () => this._login() }
            />

            <View style={{flex: 1, alignItems: 'center'}}>
              <Button text="Login" onPress={ () => this._login() }/>
            </View>

          </View>

          { this.makeFooter() }

        </View>
      </ScrollableWaitableView>
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
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})