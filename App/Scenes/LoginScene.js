import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import {
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  NativeModules
} from 'react-native'

import TextField from '../Components/TextField'
import Button from '../Components/Button'
import SceneHeading from '../Components/SceneHeading'
import FormHeading from '../Components/FormHeading'
import Config from '../Config'
import { connect } from 'react-redux'
import * as loginActions from '../Actions/Login'
import * as appActions from '../Actions/App'
import { FontSizes } from '../GlobalStyles'
import { ModalMode } from '../Components/WaitModal'
import Api from '../Api'

class LoginScene extends Component {

  constructor(props) {
    super(props)
    // For future terseness
    this.actions = this.props.actions
    this.dispatch = this.props.dispatch
    this.navigator = this.props.navigator
    this.route = this.props.route
  }

  componentWillMount() {
    this.loadPersistedPhoneNumber()
  }

  loadPersistedPhoneNumber() {
    AsyncStorage.getItem('@phoneNumber',(error, result) => {
      if(!error)
        this.actions.phoneNumberTextChange(result)
    })
  }

  login() {
    const { phoneNumber, pin } = this.props.state.Login

    this.props.dispatch(appActions.setModal({
      modalVisible: true,
      modalText: "Logging in",
      modalMode: ModalMode.WAITING
    }))

    if(phoneNumber == '666' && pin == '666'){
      NativeModules.ReactNativeCrashTheAppAndroid.crashTheApp("El diablo!")
    } else {
      // this.actions.attempt(
      //   phoneNumber,
      //   pin,
      //   this.navigator
      // )
      Api.login(phoneNumber, pin).then((data) => {
        alert('Ja ' + data.toString())
      }).catch((error) => {
        alert('Nein ' + error.toString())
      })
    }

    AsyncStorage.setItem('@phoneNumber',phoneNumber,(error) => {
      if(error) {
        console.log('Could not store phone number')
      } else {
        console.log('Phone number stored '+phoneNumber)
      }
    })
  }

  render() {
    const { phoneNumber, pin } = this.props.state.Login
    let footer = <Text style={{fontStyle: 'italic', fontSize: FontSizes.p}}>ECD v{Config.version}</Text>

    if(Config.debug) {
      footer =
        <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', padding: 10}}>
          <Text style={{fontStyle: 'italic', fontSize: FontSizes.p}}>RN v{Config.rnVersion}</Text>
          <Text style={{fontStyle: 'italic', fontSize: FontSizes.p}}>ECD v{Config.version}</Text>
        </View>
    } else {
      footer =
        <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', padding: 10}}>
          <Text style={{fontStyle: 'italic', fontSize: FontSizes.p}}>ECD v{Config.version}</Text>
        </View>
    }

    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
        <View style={{height: 20}}/>
        <View style={{height: 320}}>
          <SceneHeading text="ECD APP"/>

          <FormHeading text="Login"/>
          <TextField
            value={ phoneNumber }
            ref="phoneNumber"
            onChangeText={ (text) => this.actions.phoneNumberTextChange(text) }
            placeholder="Phone Number"
            maxLength={10}
            keyboardType="phone-pad"
            returnKeyType="next"
            onSubmitEditing={ () => this.refs.pin.textInput.focus() }
          />

          <TextField
            value={ pin }
            ref="pin"
            onChangeText={ (text) => this.actions.pinTextChange(text) }
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