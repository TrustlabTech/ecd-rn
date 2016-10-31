import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView
} from 'react-native'

import NavBar from '../Components/NavBar'
import TextField from '../Components/TextField'
import Scene from '../Components/Scene'
import SceneView from '../Components/SceneView'
import WaitModal from '../Components/WaitModal'
import Config from '../Config'
import Routes from '../Routes'
import { connect } from 'react-redux'
import * as registerActions from '../Actions/Register'

class RegisterScene extends Component {

  constructor(props) {
    super(props)
  }

  register() {
    this.props.actions.attempt(
      this.props.state.Register.textFieldValues
    )
  }

  render() {
    const state = {
      waitingForNetwork,
      showWaitModal,
      errorMessage,
      textFieldValues
    } = this.props.state.Register

    const actions = {
      textChange
    } = this.props.actions

    return (
      <Scene>

        <WaitModal
          animating={ state.waitingForNetwork }
          visible={ state.showWaitModal }
          text={ state.errorMessage ? state.errorMessage : "Registering" }
          onPressClose={ () => actions.closeModal() }
          popOnClose={true}
          ref="waitmodal"
        />
        
        <NavBar
          navigator={ this.props.navigator }
          route={ this.props.route }
          title="Register"
          rightButtonText="Next"
          rightButtonAction={ () => this.register() }
        />

        <SceneView>

          <TextField
            value={ state.firstName }
            ref="firstName"
            onChangeText={ (text) => actions.textChange(text, 'firstName') }
            label="First Name"
            autoFocus={true}
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={ (event) =>
              this.refs.lastName.textInput.focus()
            }
          />

          <TextField
            value={ state.lastName }
            ref="lastName"
            onChangeText={ (text) => actions.textChange(text, 'lastName') }
            label="Last Name"
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={ event =>
              this.refs.phoneNumber.textInput.focus()
            }
          />

          <TextField
            value={ state.phoneNumber }
            ref="phoneNumber"
            onChangeText={ (text) => actions.textChange(text, 'phoneNumber') }
            label="Phone number"
            keyboardType="phone-pad"
            returnKeyType="next"
            onSubmitEditing={ event =>
              this.refs.pin.textInput.focus()
            }
          />

          <TextField
            value={ state.pin }
            ref="pin"
            onChangeText={ (text) => actions.textChange(text, 'pin') }
            label="Pin"
            secureTextEntry={true}
            maxLength={4}
            keyboardType="phone-pad"
            returnKeyType="next"
            onSubmitEditing={ event =>
              this.refs.pinConfirm.textInput.focus()
            }
          />

          <TextField
            value={ state.pinConfirm }
            ref="pinConfirm"
            onChangeText={ (text) => actions.textChange(text, 'pinConfirm') }
            label="Confirm Pin"
            secureTextEntry={true}
            maxLength={4}
            keyboardType="phone-pad"
            onSubmitEditing={ () => this.register() }
          />

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
    actions: bindActionCreators(registerActions,dispatch)
  })
)(RegisterScene)