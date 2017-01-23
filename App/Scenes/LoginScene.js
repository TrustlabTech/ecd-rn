/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */
/* globals fetch */

import React from 'react'
import IMPComponent from '../Impulse/IMPComponent'
import IMPLog from '../Impulse/IMPLog'
import AndroidBackButton from 'react-native-android-back-button'
import {
  Text,
  View,
  AsyncStorage,
  Alert,
  StyleSheet,
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
  Button
} from '../Components'

import { Hoshi } from 'react-native-textinput-effects'
const dismissKeyboard = require('dismissKeyboard')

/**
 * A scene allowing users to login using their phone number and pin
 * @extends IMPComponent
 */
export default class LoginScene extends IMPComponent {

  constructor(props) {
    super(props)
    if (Config.debug && Config.debugAutoLogin) {
      this.state = {
        serverOnline: false,
        phoneNumber: '0000',
        pin: '0000'
      }
      setTimeout(() => this._login(), 100)
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
      if (!error) {
        setTimeout(() => this.setState({ phoneNumber: phoneNumber }), Config.sceneTransitionMinumumTime)
        if (Config.debug) {
          IMPLog.async(`Loaded ${phoneNumber} from Async storage`)
        }
      } else {
        const errorMessage = 'Could not load stored phone number from devices. This is normal if it is the first time.'
        if (Config.debug) {
          IMPLog.async(errorMessage + error.toString())
        } else {
          Sentry.addBreadcrumb(this._className, errorMessage + error.toString())
        }
      }
    })
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loaded: true }), Config.sceneTransitionMinumumTime)
  }

  /**
   * Check if the server is online
   * @returns {undefined}
   */
  serverStatus() {
    fetch(Config.http.baseUrl)
    .then((response) => {
      this.setState({ serverOnline: true })
    })
    .catch((error) => {
      this.setState({ serverOnline: false })
      if (Config.debug) {
        IMPLog.error('Could not connect to server: ' + error.toString(), this._fileName)
      }
    })
  }

  /**
   * Log the user in
   * @returns {undefined}
   */
  _login() {
    const { phoneNumber, pin } = this.state
    if (!phoneNumber) {
      Alert.alert(
          'Please enter your phone number',
          'Please enter the phone number you registered with.',
          [{ text: 'Okay' }]
        )
      return
    }
    if (!pin) {
      Alert.alert(
          'Please enter your pin',
          'Please enter your 4 digit ECD pin.',
          [{ text: 'Okay' }]
        )
      return
    }
    this.setModal({ visible: true })

      // Check for the devil
    if (phoneNumber === '666' && pin === '666') {
      Sentry.crashTheApp('El diablo!')
    } else {
        // dismissKeyboard()

        // Login to server
      Api.login(phoneNumber, pin)

        .then((data) => {
          this.setModal({ visible: false })
          this.setState({ pin: '' })

          // Check for error
          if (data.error) {
            IMPLog.error(data.error, this._fileName)
            Alert.alert(
              Config.errorMessage.login.title,
              data.error,
              [{ text: 'Okay' }]
            )
          } else {
            // Save user info to session
            Session.update({ userData: data })

            // and track her with GA
            this.props._gaTrackers.tracker1.setUser(data.user.id + ' ' + data.user.given_name + ' ')
            Sentry.addNavigationBreadcrumb(this._className, this._className, 'MainScene')

            // Go to main scene
            this.navigator.push({
              ...Routes.main,
              user: data.user,
              token: data._token
            })
          }
        })

        .catch((error) => {
          this.setModal({ visible: false })
          this.setState({ pin: '' })

          // Handle error
          if (Config.debug) {
            IMPLog.error(error.toString(), this._fileName)
          } else {
            Sentry.captureEvent(error.stack, this._fileName)
          }
          Alert.alert(
            Config.errorMessage.network.title,
            Config.errorMessage.network.message,
            [{ text: 'Okay' }]
          )
        })
    }

      // Never overwrite with empty phone number
    if (phoneNumber !== '') {
        // Put phone number in persistant storage
      AsyncStorage.setItem('@phoneNumber', phoneNumber, (error) => {
        if (error) {
          if (Config.debug) {
            IMPLog.async('Could not store phone number with Async storage' + error.toString())
          } else {
            Sentry.captureEvent(error.toString(), this._className)
          }
        } else {
          if (Config.debug) {
            IMPLog.async(`Phone number ${phoneNumber} stored to Async storage`)
          }
        }
      })
    }
  }

  /**
   * Get the information to be displayed in the footer
   * @returns {Array} The text items to display
   */
  footerTexts() {
    return Config.debug
    ? [`ECD v${Config.version}`, `RN v${Config.rnVersion}`, `Server: ${Config.http.baseUrl}`, 'Server Status: ' + (this.state.serverOnline ? 'Online' : 'Offline')]
    : [`v${Config.version}`, `${Config.http.server}`]
  }

  render() {
    super.render()

    return (
      <ScrollableWaitableView loaded={this.state.loaded}>
        <SceneHeading text="ECD APP" />
        <AndroidBackButton onPress={() => false} />
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>

          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 10 }}>
              <Hoshi
                ref="phoneNumber"
                value={this.state.phoneNumber}
                label={'Phone Number'}
                borderColor={Colours.primary}
                keyboardType="numeric"
                autoCapitalize={'none'}
                inputStyle={{ color: Colours.darkText, fontSize: 24 }}
                labelStyle={{ color: Colours.darkText }}
                selectTextOnFocus
                onChangeText={(text) => this.setState({ phoneNumber: text })}
                returnKeyType="next"
                onSubmitEditing={() => this.refs.pin.focus()}
                selectionColor={Colours.secondaryHighlight}
              />
            </View>

            <View style={{ paddingTop: 15, paddingBottom: 20 }}>
              <Hoshi
                ref="pin"
                value={this.state.pin}
                label={'Pin'}
                borderColor={Colours.primary}
                keyboardType="numeric"
                autoCapitalize={'none'}
                inputStyle={{ color: Colours.darkText, fontSize: 24 }}
                labelStyle={{ color: Colours.darkText }}
                selectTextOnFocus
                onChangeText={(text) => this.setState({ pin: text })}
                maxLength={4}
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => this._login()}
                selectionColor={Colours.primaryLowlight}
                blurOnSubmit={false} // If not set to false onSubmitEditing runs twice
              />
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Button text="Login" onPress={() => this._login()} />
              <View style={{ alignItems: 'center', height: 200, justifyContent: 'flex-end' }}>
                {this.footerTexts().map((x, i) => (<Text key={i} style={ss.footerText}>{x}</Text>))}
              </View>
            </View>
          </View>
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
    alignItems: 'center',
    padding: 10
  }
})
