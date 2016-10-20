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
      <View style={styles.containerColumn}>
        <NavBar
          navigator={this.props.navigator}
          route={this.props.route}
          title="Register"
          rightButtonText="Next"
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            padding: 10
          }}
        >
          <View style={{height: 100}}/>
          <Text style={{textAlign: 'center'}}>Check your SMS inbox for your OTP</Text>
          <View>
            <TextInput
              style={{width: 85, height: 65, fontSize: 30}}
              keyboardType="numeric"
              placeholder="OTP"
              onChangeText={ (otp) => this.setState({ otp }) }
            />
          </View>
        </View>
      </View>
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