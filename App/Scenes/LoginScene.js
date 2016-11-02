import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
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
import SceneView from '../Components/SceneView'
import Scene from '../Components/Scene'
import Link from '../Components/Link'
import Config from '../Config'
import { connect } from 'react-redux'
import * as loginActions from '../Actions/Login'

const ConsentLogo = require('../Images/consent_logo.png')

class LoginScene extends Component {

  constructor(props) {
    super(props)
  }

  login() {
    const { phoneNumber, pin } = this.props.state.Login
    console.log("Attempting to login as",phoneNumber,pin)
    this.props.actions.attempt(
      phoneNumber,
      pin,
      this.props.navigator
    )
  }

  render() {
    const state = {
      waitingForNetwork,
      showWaitModal,
      errorMessage,
      phoneNumber,
      pin
    } = this.props.state.Login

    const actions = {
      phoneNumberTextChange,
      pinTextChange,
      closeModal
    } = this.props.actions

    return (
      <Scene>

        <WaitModal
          animating={ state.waitingForNetwork }
          visible={ state.showWaitModal }
          onPressClose={ () => actions.closeModal() }
          text={ state.errorMessage ? state.errorMessage : "Logging in" }
          ref="waitmodal"
        />

        <NavBar
          navigator={ this.props.navigator }
          route={ this.props.route }
          rightButtonText="Login"
          title={ this.props.route.title }
          rightButtonAction={ () => this.login() }
        />

        <SceneView>

          <View style={{alignItems: 'center'}}>
            <Image
              source={ ConsentLogo }
              style={{width: 246, height: 273}}
            />
          </View>



          <TextField
            value={ state.phoneNumber }
            ref="phoneNumber"
            onChangeText={ (text) => actions.phoneNumberTextChange(text) }
            label="Phone Number"
            maxLength={10}
            keyboardType="phone-pad"
            returnKeyType="next"
            onSubmitEditing={ () =>
              this.refs.pin.textInput.focus()
            }
          />

          <TextField
            value={ state.pin }
            onChangeText={ (text) => actions.pinTextChange(text) }
            label="Pin"
            maxLength={4}
            secureTextEntry={true}
            keyboardType="phone-pad"
            onSubmitEditing={ () => this.login() }
          />

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
}

export default connect(
  (state) => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(loginActions, dispatch)
  })
)(LoginScene)