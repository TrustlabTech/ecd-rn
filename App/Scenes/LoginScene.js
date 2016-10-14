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
          text="Logging in..."
          subtext="Please wait..."
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

    // Prevent attempt if a field is empty
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
        // Login complete, change scene
      } else {
        this.setState({
          loggedin: false,
          attempting: false,
          error: responseJson.error
        })
        return false
      }
    }).then((success) => {
      if (success) {
        this.props.navigator.push(Routes.main)
      } else {

        //alert("Something went wrong :'(") // this is breaking react
        // we may have to use a modal or not call it at this point in the lifecycle
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