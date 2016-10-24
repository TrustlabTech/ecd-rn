import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput
} from 'react-native'

import NavBar from '../Components/NavBar'
import WaitModal from '../Components/WaitModal'
import Scene from '../Components/Scene'
import SceneView from '../Components/SceneView'
import Config from '../Config'
import Routes from '../Routes'

export default class RegisterConfirmScene extends Component {

  constructor(props) {
    super(props)
    this.state = {
      otp: null,
      attempting: false,
      error: null,
      modalVisible: false
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      error: null,
      attempting: null
    })
  }

  render() {
    return (
      <Scene>

        <WaitModal
          animating={ this.state.attempting }
          visible={ this.state.modalVisible }
          text={ this.state.error ? this.state.error : "Verifying" }
          ref="waitmodal"
        />

        <NavBar
          navigator={this.props.navigator}
          route={this.props.route}
          title="Register"
          rightButtonText="Next"
          rightButtonAction={ this.attemptConfirm }
          leftButtonText="Cancel"
        />
        <SceneView>
          <View style={{height: 100}}/>
          <Text style={{textAlign: 'center'}}>Check your SMS inbox for your OTP</Text>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={{width: 85, height: 65, fontSize: 30, textAlign: 'center'}}
              keyboardType="numeric"
              placeholder="OTP"
              onChangeText={ (otp) => this.setState({ otp }) }
              maxLength={4}
              onSubmitEditing={ this.attemptConfirm }
            />

          </View>
        </SceneView>
      </Scene>
    )
  }

  attemptConfirm = () => {
    console.log('hi')
    let otp = this.state.otp
    let errors = []
    if(!otp) errors.push("Please enter your OTP")

    if(errors.length > 0) {
      this.setState({
        error: errors.toString(),
        modalVisible: true
      })
      return
    }

    var formData = new FormData()
    formData.append('otp',otp)

    this.setState({
      attempting: true,
      modalVisible: true,
      error: null
    })

    fetch(Config.http.baseUrl + 'registerConfirm.php',{
      method: 'POST',
      body: formData
    })

    .then((response) => {
      return response.json()
    })

    .then( (responseJson) => {
      console.log(responseJson)
      if(responseJson.confirmed === true) {
        return true
      } else {
        this.setState({
          error: responseJson.error
        })
        return false
      }
    })

    .then( (success) => {
      if(success) {
        this.setState({
          attempting: false,
          modalVisible: false
        })
        this.props.navigator.resetTo(Routes.main)
      } else {
        console.log("Failure")
        this.setState({
          attempting: false,
          error: "Confirmation failed"
        })
      }
    })

    .catch( (error) => {
      console.log("RegisterConfirmScene:attempt", error)
      this.setState({
        error: "Network error",
        attempting: false
      })
    })
  }
}
