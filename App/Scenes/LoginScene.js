import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  TextInput,
  Dimensions
} from 'react-native'

import Routes from '../Routes'
import NavBar from '../Components/NavBar'
import TextField from '../Components/TextField'
import Button from '../Components/Button'
import SceneView from '../Components/SceneView'
import Scene from '../Components/Scene'
import SceneHeading from '../Components/SceneHeading'
import FormHeading from '../Components/FormHeading'
import Link from '../Components/Link'
import Config from '../Config'
import { connect } from 'react-redux'
import * as loginActions from '../Actions/Login'
import * as appActions from '../Actions/App'
import { FontSizes } from '../GlobalStyles'
import { ModalMode } from '../Components/WaitModal'
import Checkbox from '../Components/Checkbox'

class LoginScene extends Component {

  constructor(props) {
    super(props)
    // For future terseness
    this.actions = this.props.actions
    this.dispatch = this.props.dispatch
    this.navigator = this.props.navigator
    this.route = this.props.route
  }

  login() {
    const { phoneNumber, pin } = this.props.state.Login
    this.props.dispatch(appActions.setModal({
      modalVisible: true,
      modalText: "Logging in",
      modalMode: ModalMode.WAITING
    }))
    this.actions.attempt(
      phoneNumber,
      pin,
      this.navigator
    )
  }

  render() {
    const { phoneNumber, pin } = this.props.state.Login;

    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
        <View style={{flex: 1}}/>
        <View style={{height: 330}}>
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
        <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', padding: 10}}>
          <Text style={{fontStyle: 'italic', fontSize: FontSizes.p}}>ECD v{Config.version}</Text>
          <Text style={{fontStyle: 'italic', fontSize: FontSizes.p}}>RN v{Config.rnVersion}</Text>
        </View>
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