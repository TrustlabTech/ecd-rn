import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import GlobalStyles from '../GlobalStyles'

import SceneHeading from '../Components/SceneHeading'
import FormButton from '../Components/FormButton'
import FormLabel from '../Components/FormLabel'

import Routes from '../Routes'

export default class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      attempting: false,
      // error: props.error || null // (will always come through componentWillReceiveProps)
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      error: props.error || null,
      attempting: props.attempting || false
    })
  }

  render() {
    return (
      <View style={styles.loginContainer}>

        <SceneHeading text="Login"/>

        <FormLabel text="Username"/>
        <TextInput
          style={GlobalStyles.textInput}
          onChangeText={ (username) => this.setState({ username }) }
          value={this.state.username}
          />

        <FormLabel text="Password"/>
        <TextInput
          style={GlobalStyles.textInput}
          onChangeText={(password) => this.setState({ password }) }
          value={this.state.password} />

        <FormButton
          height={50}
          width={100}
          text="Login"
          onPress={ this.props.onAttempt }
        />
        <Text>Error: {this.state.error}</Text>
        <Text>Don't have an account?</Text>
        <TouchableHighlight onPress={() => this.props.navigator.push(Routes.register)}>
            <Text>Register here</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: 'white',
    padding: 20,
  }
})