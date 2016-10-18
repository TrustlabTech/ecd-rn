import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

import SceneHeading from '../Components/SceneHeading'
import FormButton from '../Components/FormButton'
import FormLabel from '../Components/FormLabel'

import Routes from '../Routes'

import TextField from '../Components/TextField'

export default class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
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
      <View style={ styles.loginContainer }>
        <Text style={{height: 18,color: 'red' }}>{ this.state.error }</Text>

        <TextInput
          style={{height: 55, fontSize: 30, padding: 10}}
          onChangeText={ (phoneNumber) => this.setState({ phoneNumber }) }
          value={ this.state.phoneNumber }
          placeholder="Phone Number"
          />

        <TextInput
          style={{height: 55, fontSize: 30, padding: 10 }}
          onChangeText={ (password) => this.setState({ password }) }
          value={ this.state.password }
          placeholder="Password"
          secureTextEntry />

        <View style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{ fontSize: 18, marginTop: 25, color: '#131313' }}>Don't have an account yet?</Text>
          <FormButton
            text="Register"
            onPress={ () => this.props.navigator.push(Routes.register) }
            height={ 50 }
            width={ 100 }
          />
        </View>
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