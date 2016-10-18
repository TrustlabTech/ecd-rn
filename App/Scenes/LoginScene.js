import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Modal
} from 'react-native'

import Config from '../Config'
import Routes from '../Routes'
import NavBar from '../Components/NavBar'
import LoginForm from '../Components/LoginForm'
import WaitModal from '../Components/WaitModal'

/* Props:
 * route: Route
 * navigator: Navigator
 */
export default class MainScene extends Component {

  constructor(props) {

    super(props)
    this.state = {
      username:   '',
      password:   '',
      loggedin:   false,
      attempting: false,
      modalOpen:  false,
      error:      null
    }

  }

  render() {
    return (
      <View style={ styles.containerColumn }>

        <WaitModal text="Logging in"
          subtext="Please wait..."
          visible={ this.state.attempting }
          ref="waitmodal"
        />

        <NavBar
          navigator={ this.props.navigator }
          route={ this.props.route }
          rightButtonText="Login"
          title="ECD"
          rightButtonAction={ () => this.attemptLogin() }
        />

        <View style={ styles.containerColumn }>
          <LoginForm
            onAttempt={ () => this.attemptLogin() }
            navigator={ this.props.navigator }
            attempting={ this.state.attempting }
            error={ this.state.error }
            ref="loginform"
          />
        </View>

        <View>
          <TouchableHighlight onPress={ () => this.props.navigator.push(Routes.registerConfirm) } >
            <Text>RegisterConfirmScene</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={ () => this.props.navigator.replace(Routes.main)} >
            <Text>MainScene</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={ () => alert('Test')}>
            <Text>CentreScene</Text>
          </TouchableHighlight>
        </View>

      </View>
    )
  }


  // Network
  attemptLogin = () => {

    let username = this.refs.loginform.state.username
    let password = this.refs.loginform.state.password
    let errors = []

    // Prevent attempt if a field is empty
    if (username.length < 1) {
      errors.push("No username given")
    }

    if (password.length < 1) {
      errors.push("No password given")
    }

    if (errors.length > 0) {
      this.setState({
        error: errors.toString()
      })
      return
    }

    // Create form data
    var formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    // Check if already logged in...
    if (this.state.loggedin) {
      this.setState({
        error: 'Already logged in'
      })
      return
    }

    // Bring up modal
    this.setState({
      attempting: true
    })

    // Initialise request
    fetch('http://localhost:8989/', {
      method: 'POST',
      body: formData
    })

    // Response received
    .then((response) => {
      this.setState({
        attempting: false
      })
      return response.json()
    })

    // Parse to JSON
    .then( (responseJson) => {
      if (responseJson.authenticated === true) {
        this.setState({
          loggedin: true,
          error: null
        })
        return true
      } else {
        this.setState({
          loggedin: false,
          attempting: false,
          error: responseJson.error
        })
        return false
      }
    })

    .then((success) => {

      if (success) {
        // Login complete, change scene
        this.props.navigator.replace(Routes.main)
      } else {
        this.setState({
          error: "Invalid Username or Password"
        })
      }

    })

    // On reject
    .catch( (error) => {
      console.log('LoginScene:attempt', error)
      this.setState({
        error: "Network error ",
        attempting: false
      })
    })
  }
}

const styles = StyleSheet.create({
  containerColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }
})