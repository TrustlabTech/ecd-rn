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
const ConsentLogo = require('../Images/consent_logo.png')
import { connect } from 'react-redux'
import * as loginActions from '../Actions/Login'

class LoginScene extends Component {

  constructor(props) {

    super(props)
    this.state = {
      phoneNumber: '',
      pin: ''
    }

  }

  login() {
    // Redux
    this.props.actions.attempt(
      this.refs.phoneNumber.state.value,
      this.refs.pin.state.value
    )
  }

  render() {
    const { state } = this.props

    return (
      <Scene>

        <WaitModal
          animating={ state.Login.waitingForNetwork }
          visible={ state.Login.showWaitModal }
          text={ state.Login.errorMessage ? state.Login.errorMessage : "Logging in" }
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
            onSubmitEditing={ (event) =>
              this.refs.pin.textInput.focus()
            }
          />

          <TextField
            ref="pin"
            label="Pin"
            maxLength={4}
            keyboardType="phone-pad"
            onSubmitEditing={ () => this.login() }
          />

          <View style={{flexDirection: 'column', padding: 10, alignItems: 'center'}}>
            <Link text="Forgot your pin?" onPress={ () => alert('Boom!') }/>
          <Link text="Not yet registered?" onPress={ () => this.props.navigator.push(Routes.register) }/>
          </View>



          <View>

            <TouchableHighlight onPress={ () => this.login() } >
              <Text>TEST BUTTON</Text>
            </TouchableHighlight>

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