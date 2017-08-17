/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

'use-strict'

// base libs
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  BackHandler,
  AsyncStorage,
} from 'react-native'
// components/views
import Button from '../components/Button'
// redux actions
import { setSession } from '../actions'
// libs/functions
import { Request, ServerErrorException } from '../libs/network'
// constants
import { ICONS, COLORS, API_LOGIN, AS_USERNAME } from '../constants'

const backListener = () => true

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      formError: '',
    }

    this.nextInput = this.nextInput.bind(this)
    this.onButtonPress = this.onButtonPress.bind(this)
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
  }

  componentWillMount() {
    this.props.username && this.setState({ username: this.props.username })
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', backListener)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backListener)
  }

  nextInput() {
    this.passwordInput.focus()
  }

  onUsernameChange(t) {
    this.setState({ username: t, formError: '' })
  }

  onPasswordChange(t) {
    this.setState({ password: t, formError: '' })
  }

  async onButtonPress() {
    const { username, password } = this.state

    if (!username.match(/^00[0-9]{11,}$/)) {
      this.setState({ formError: 'Invalid username format' })
      return
    }

    try {
      AsyncStorage.setItem(AS_USERNAME, username)
    } catch (e) { /* never mind */ }

    const
      { url, options } = API_LOGIN({ username, password }),
      request = new Request()

    try {
      const response = await request.fetch(url, options)
      this.props.setSession(response._token, response.user, response.meta)
      !this.props.navigator.dismissAllModals() && this.props.onLoginCompleted && this.props.onLoginCompleted()
    } catch (e) {
      // FIXME: server replies with 500 status code
      // on failed login
      if (e instanceof ServerErrorException) {
        this.setState({ formError: 'Invalid username or password' })
      } else {
        this.setState({ formError: e.message })
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Early Childhood Development</Text>
        <Text style={styles.headerDesc}>Amply Platform</Text>
        <Image source={ICONS.logo} style={styles.logo} />
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          returnKeyType={'next'}
          keyboardType={'numeric'}
          onSubmitEditing={this.nextInput}
          onChangeText={this.onUsernameChange}
          defaultValue={this.props.username || ''} />
        <Text style={styles.label}>Password</Text>
        <TextInput
          ref={(r) => this.passwordInput = r}
          style={styles.input}
          returnKeyType={'done'}
          secureTextEntry={true}
          onChangeText={this.onPasswordChange} />
        <Text style={styles.formError}>{this.state.formError}</Text>
        <Button style={styles.button} onPress={this.onButtonPress}>
          <Text style={styles.buttonText}>Login</Text>
        </Button>
      </View>
    )
  }
}
Login.propTypes = {
  username: PropTypes.string,
  onLoginCompleted: PropTypes.func,
  setSession: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  header: {
    fontSize: 24,
    fontWeight: '900',
    alignSelf: 'center',
    color: COLORS.darkGrey2
  },
  headerDesc: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 20,
    alignSelf: 'center',
    color: COLORS.grey,
  },
  logo: {
    width: 192,
    height: 192,
    marginBottom: 40,
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: '200',
    color: COLORS.darkGrey2
  },
  textInput: {
    height: 50,
    fontSize: 18,
    color: COLORS.darkGrey2
  },
  formError: {
    fontSize: 12,
    color: COLORS.red,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 50,
    backgroundColor: COLORS.brandFirst,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
})

const mapDispatchToProps = (dispatch) => {
  return {
    setSession: (token, user, meta) => dispatch(setSession(token, user, meta))
  }
}

export default connect(null, mapDispatchToProps)(Login)
