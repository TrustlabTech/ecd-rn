import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import Config from '../Config'
import NavBar from '../Components/NavBar'
import RegisterForm from '../Components/RegisterForm'

export default class RegisterScene extends Component {

  constructor(props) {
    super(props)
    this.state = {
      route: props.route,
      navigator: props.navigator
    }
  }

  render() {
    return (
      <View style={styles.containerColumn}>
        <NavBar
          navigator={this.state.navigator}
          route={this.state.route}
          title="Register"
          rightButtonText="Next"
          />
        <View style={styles.containerColumn}>
        <RegisterForm/>
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
  }
})