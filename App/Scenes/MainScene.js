import React, { Component } from 'react'
import {
  Text,
  View,
  Dimensions,
  Image,
  StatusBar,
  ScrollView,
  TouchableHighlight
} from 'react-native'

import NavBar from '../Components/NavBar'
import Button from '../Components/Button'
import Routes from '../Routes'
import Scene from '../Components/Scene'
import SceneView from '../Components/SceneView'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as mainActions from '../Actions/Main'
import * as appActions from '../Actions/App'
import * as navigationActions from '../Actions/Navigation'
import MainDrawer from '../Components/MainDrawer'

class MainScene extends Component {

  constructor(props) {
    super(props)
    // For future terseness
    this.actions = this.props.actions
    this.navigator = this.props.navigator
    this.route = this.props.route
  }

  takeAttendance() {



    // this.props.dispatch(navigationActions.push(Routes.class, this.navigator))
    this.navigator.push(Routes.class)
  }

  logout() {
    this.navigator.replace(Routes.login)
  }

  render() {
    let mainBtnText = "Take\nAttendance"
    return (
        <View style={{flex: 1}}>

          <NavBar
            title="ECD APP"
            navigator={ this.props.navigator }
            leftButtonText="|||"

          />


          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

            <Button
              text={mainBtnText}
              onPress={() => this.takeAttendance()}
              width={250}
              height={100}
            />

          </View>
          <View style={{padding: 20}}>
            <Button
              text="Log Out"
              onPress={() => this.logout() }
            />
          </View>
        </View>
    )
  }
}

export default connect(
  (state) => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(mainActions,dispatch)
  })
)(MainScene)