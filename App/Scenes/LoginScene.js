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

export default class MainScene extends Component {

  constructor(props) {
    super(props)
    this.state = {
      route: props.route,
      username: props.username || '',
      password: props.password || '',
      loggedin: false,
      attempting: false,
      modalOpen: false,
      error: null
    }
    console.log('MainScreen:Constructor.state',this.state)
  }

  componentWillMount() {
    console.log('MainScene:componentWillMount')
  }

  shouldComponentUpdate(props) {
    return true;
  }

  componentDidMount() {
    console.log('MainScene:componentDidMount')
  }

  componentWillReceiveProps() {
    console.log('MainScene:componentWillReceiveProps')
  }

  render() {
    console.log('MainScrene:render.state', this.state)

    return (
      <View style={styles.containerColumn}>
        <WaitModal
          text="Please wait"
          visible={this.state.attempting}
          ref="waitmodal"
        />
        <NavBar
          navigator={ this.props.navigator }
          route={ this.props.route }
          rightButtonText="Login"
          rightButtonAction={ () => this.attempt() }
        />
        <View style={ styles.containerColumn }>
          <LoginForm
            onAttempt={ () => this.attempt() }
            navigator={ this.props.navigator }
            attempting={ this.state.attempting }
            error={ this.state.error }
            ref="loginform"
          />
        </View>
      </View>
    )
  }


  // Network
  attempt = () => {
    let username = this.refs.loginform.state.username
    let password = this.refs.loginform.state.password
    let errors = []

    if (password.length < 1) {
      errors.push("Password cannot be empty")
    }

    if (username.length < 1) {
      errors.push("Username cannot be empty")
    }

    if (errors.length > 0) {
      this.setState({
        error: errors.toString()
      })
      return
    }
    var formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    if (this.state.loggedin) {
      // Already logged in...
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
      return response.json()
    })
    // Parse to JSON
    .then( (responseJson) => {
      if (responseJson.authenticated === true) {
        this.setState({
          loggedin: true,
          attempting: false,
          error: null
        })
      } else {
        this.setState({
          loggedin: false,
          attempting: false,
          error: responseJson.error
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