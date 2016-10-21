import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Modal,
  TextInput
} from 'react-native'

import Config from '../Config'
import Routes from '../Routes'
import NavBar from '../Components/NavBar'
import WaitModal from '../Components/WaitModal'
import Scene from '../Components/Scene'
import SceneView from '../Components/SceneView'

export default class RegisterConfirmScene extends Component {

  constructor(props) {
    super(props)
    this.state = {
      otp: null,
      attempting: false
    }
  }

  render() {
    return (
      <Scene>
        <NavBar
          navigator={this.props.navigator}
          route={this.props.route}
          title="Register"
          rightButtonText="Next"
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
            />
          </View>
        </SceneView>
      </Scene>
    )
  }
}

const styles = StyleSheet.create({
  containerColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  middlePiece: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})