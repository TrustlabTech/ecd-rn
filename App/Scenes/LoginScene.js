import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'

import Config from '../Config'
import Routes from '../Routes'
import NavBar from '../Components/NavBar'
import LoginForm from '../Components/LoginForm'

export default class MainScene extends Component {

  constructor(props) {
    super(props)
    this.state = {
      route: props.route,
      username: props.username || '',
      password: props.password || '',
      loggedin: false,
      attempting: false,
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
        <NavBar
          navigator={ this.props.navigator }
          route={ this.props.route }
          rightButtonText="Login"
          rightButtonAction={ () => this.attempt() }
        />
        <View style={ styles.containerColumn }>
          <LoginForm
            onAttempt={() => this.attempt()}
            navigator={ this.props.navigator }
            attempting={ this.state.attempting }
            error={this.state.error}
            ref="loginform"
          />
        </View>
      </View>
    )
  }

  attempt = () => {
    console.log('====== ATTEMPT =======')
    console.log( this.refs.loginform.state.username )
    console.log(this.refs.loginform.state.password)
    var oldRequest = {
      method: 'POST',
      headers: Config.httpClient.headers,
      body: JSON.stringify({
        username: this.refs.loginform.state.username,
        password: this.refs.loginform.state.password
      })
    }
    var request = new Request('http://localhost:8989',
    {
      method: 'POST',
      headers: Config.httpClient.headers,
      body: JSON.stringify({
        username: this.refs.loginform.state.username,
        password: this.refs.loginform.state.password
      })
      }).formData().then((data) => {
        console.log(data)
    })

    fetch('http://localhost:8989/', {
      method: 'POST',
      headers: Config.httpClient.headers,
      body: JSON.stringify({
        username: this.refs.loginform.state.username,
        password: this.refs.loginform.state.password
      })
    }).then(
      (response) => {
        if (!this.state.loggedin) {
          this.setState({
            attempting: true
          })
          return response.json()
        } else {
          return Promise.reject("Already logged in")
        }
    }).then(
      (responseJson) => {
        if (responseJson.authenticated === true) {
          this.setState({
            loggedin: true,
            attempting: false
          })
        } else {
          this.setState({
            loggedin: false,
            attempting: false
          })
        }
      }).catch((error) => {
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