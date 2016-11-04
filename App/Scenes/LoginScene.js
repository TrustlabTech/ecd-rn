import React, { Component } from 'react'
import { store, bindActionCreators } from 'redux'
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
import * as appActions from '../Actions/App'

const ConsentLogo = require('../Images/consent_logo.png')

class LoginScene extends Component {

  constructor(props) {
    super(props)
    // For future terseness
    this.dispatch = this.props.store.dispatch
    this.actions = this.props.actions
    this.navigator = this.props.navigator
    this.route = this.props.route
  }

  login() {
    const { phoneNumber, pin } = this.props.state.Login

    if(Config.debug) console.debug("Attempting to login as",phoneNumber,pin)

    this.dispatch(appActions.setModal({
      modalVisible: true,
      modalText: "Loading",
      modalWaiting: true
    }))
    this.props.actions.attempt(
      phoneNumber,
      pin,
      this.navigator
    )
  }

  render() {
    const { phoneNumber, pin } = this.props.state.Login;
    const { modalWaiting, modalVisible, modalText } = this.props.state.App

    return (
      <Scene>

        <WaitModal
          animating={ modalWaiting }
          visible={ modalVisible }
          onPressClose={ () => this.dispatch(appActions.setModal({modalVisible:false})) }
          text={ modalText }
          ref="waitmodal"
        />

        <NavBar
          navigator={ this.navigator }
          route={ this.route }
          rightButtonText="Login"
          title={ this.route.title }
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
            value={ phoneNumber }
            ref="phoneNumber"
            onChangeText={ (text) => this.actions.phoneNumberTextChange(text) }
            label="Phone Number"
            maxLength={10}
            keyboardType="phone-pad"
            returnKeyType="next"
            onSubmitEditing={ () =>
              this.refs.pin.textInput.focus()
            }
          />

          <TextField
            value={ pin }
            ref="pin"
            onChangeText={ (text) => this.actions.pinTextChange(text) }
            label="Pin"
            maxLength={4}
            secureTextEntry={true}
            keyboardType="phone-pad"
            onSubmitEditing={ () => this.login() }
          />

          <View style={{flexDirection: 'column', padding: 10, alignItems: 'center'}}>
            <Link text="Forgot your pin?" onPress={ () => alert('Boom!') }/>
          <Link text="Not yet registered?" onPress={ () => this.navigator.push(Routes.register) }/>
          </View>


          {/*
          <View>

            <TouchableHighlight onPress={ () => this.navigator.push(Routes.registerConfirm) } >
              <Text>RegisterConfirmScene</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={ () => this.navigator.replace(Routes.main)} >
              <Text>MainScene</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={ () => this.navigator.push(Routes.attendance) }>
              <Text>Attendance Scene</Text>
            </TouchableHighlight>
          </View>
          */}
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