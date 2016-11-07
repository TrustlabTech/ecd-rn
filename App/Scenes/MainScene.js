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

class MainScene extends Component {

  constructor(props) {
    super(props)
    // For future terseness
    this.dispatch = this.props.store.dispatch
    this.actions = this.props.actions
    this.navigator = this.props.navigator
    this.route = this.props.route
  }

  render() {
    let mainBtnText = "Take\nAttendance"
    return (
        <Scene dispatch={this.props.store.dispatch}>

          <NavBar
            title="ECD APP"
            navigator={ this.props.navigator }
            leftButtonText="|||"

          />


          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

            {/*<TouchableHighlight onPress={ () => this.props.navigator.push(Routes.class) }>
              <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 20}}>
                <Text style={{fontSize: 26}}>Take Attendance</Text>
              </View>
            </TouchableHighlight>*/}
            <Button
              text={mainBtnText}
              onPress={() => this.props.navigator.push(Routes.class)}
              width={250}
              height={100}
            />

          </View>
          <View style={{padding: 20}}>
            <Button
              text="Log Out"
              onPress={() => this.props.navigator.push(Routes.login)}
            />
          </View>
        </Scene>
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