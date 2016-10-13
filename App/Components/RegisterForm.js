import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native'
import SceneHeading from './SceneHeading'
import FormLabel from './FormLabel'
import GlobalStyles from '../GlobalStyles'
export default class RegisterForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null,
      passwordConfirm: null,
      attempting: false
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      error: props.error || null,
      passwordConfirm: null,
      attempting: props.attempting || false
    })
  }

  render() {
    return (
      <View style={styles.registerContainer}>

        <SceneHeading text="Register" />

        <FormLabel text="Username" />
        <TextInput
          style={GlobalStyles.textInput}
          onChangeText={(username) => this.setState({ username })}
          value={ this.state.username } />

        <FormLabel text="Password" />
        <TextInput
          style={GlobalStyles.textInput}
          onChangeText={(password) => this.setState({ password })}
          value={ this.state.password } />

        <FormLabel text="Password Confirm" />
        <TextInput
          style={GlobalStyles.textInput}
          onChangeText={(passwordConfirm) => this.setState({ passwordConfirm })}
          value={ this.state.passwordConfirm } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    backgroundColor: 'white',
    padding: 20
  }
})