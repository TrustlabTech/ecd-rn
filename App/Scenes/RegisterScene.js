import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import {
  Text,
  TouchableHighlight,
  ScrollView,
  Picker
} from 'react-native'

import NavBar from '../Components/NavBar'
import TextField from '../Components/TextField'
import Scene from '../Components/Scene'
import SceneView from '../Components/SceneView'
import WaitModal from '../Components/WaitModal'
// import Config from '../Config'
// import Routes from '../Routes'
import { connect } from 'react-redux'
import * as registerActions from '../Actions/Register'
import * as appActions from '../Actions/App'

class RegisterScene extends Component {

  constructor(props) {
    super(props)

    this.dispatch = this.props.store.dispatch
    this.actions = this.props.actions
    this.navigator = this.props.navigator
    this.route = this.props.route

  }


  componentDidMount() {
    // Don't refetch the centres
    if(!this.props.state.Register.centreSelectValuesFetched) {
      this.dispatch(appActions.setModal({
        modalVisible: true,
        modalText: "Bring dich um",
        modalWaiting: true
      }))
      // fetch centres
      this.actions.fetchCentres()

    }
  }

  register() {
    this.props.actions.attempt(
      this.props.state.Register.centreSelectSelected,
      this.props.state.Register.textFieldValues,
      this.navigator
    )
  }

  render() {


    const {
      textFieldValues,
      centreSelectValues,
      centreSelectSelected
    } = this.props.state.Register

    const {
      modalWaiting, modalVisible, modalText
    } = this.props.state.App

    const picker =
      <Picker
        selectedValue={centreSelectSelected}
        onValueChange={(selection) => this.actions.centreSelectionChanged(selection) }>

          {centreSelectValues.map( (val,i) =>
            <Picker.Item label={val} key={val} value={i} />
          )}

      </Picker>

    return (
      <Scene>

        <WaitModal
          animating={ modalWaiting }
          visible={ modalVisible }
          text={ modalText }
          onPressClose={ () => this.dispatch(appActions.setModal({modalVisible:false})) }
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
          <Text>Select Centre</Text>

          {picker}
          <TextField
            value={ textFieldValues['firstName'] }
            ref="firstName"
            onChangeText={ (text) => this.actions.textChange(text, 'firstName') }
            label="First Name"
            autoFocus={true}
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={ (event) =>
              this.refs.lastName.textInput.focus()
            }
          />

          <TextField
            value={ textFieldValues['lastName'] }
            ref="lastName"
            onChangeText={ (text) => this.actions.textChange(text, 'lastName') }
            label="Last Name"
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={ event =>
              this.refs.phoneNumber.textInput.focus()
            }
          />

          <TextField
            value={ textFieldValues['phoneNumber'] }
            ref="phoneNumber"
            onChangeText={ (text) => this.actions.textChange(text, 'phoneNumber') }
            label="Phone number"
            keyboardType="phone-pad"
            returnKeyType="next"
            onSubmitEditing={ event =>
              this.refs.pin.textInput.focus()
            }
          />

          <TextField
            value={ textFieldValues['pin'] }
            ref="pin"
            onChangeText={ (text) => this.actions.textChange(text, 'pin') }
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
            value={ textFieldValues['pinConfirm'] }
            ref="pinConfirm"
            onChangeText={ (text) => this.actions.textChange(text, 'pinConfirm') }
            label="Confirm Pin"
            secureTextEntry={true}
            maxLength={4}
            keyboardType="phone-pad"
            onSubmitEditing={ () => this.register() }
            blurOnSubmit={true}
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