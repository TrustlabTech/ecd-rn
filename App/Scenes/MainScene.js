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
import Routes from '../Routes'
import Scene from '../Components/Scene'
import SceneView from '../Components/SceneView'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as mainActions from '../Actions/Main'
import * as appActions from '../Actions/App'
import WaitModal from '../Components/WaitModal'

class MainScene extends Component {

  constructor(props) {
    super(props)
    // For future terseness
    this.dispatch = this.props.store.dispatch
    this.actions = this.props.actions
    this.navigator = this.props.navigator
    this.route = this.props.route
  }

  componentDidMount() {
    this.dispatch(appActions.setModal({
      modalVisible: false,
      modalText: "Loading",
      modalWaiting: true
    }))
  }
  render() {

    return (
        <Scene dispatch={this.props.store.dispatch}>

          <NavBar
            title="ECD APP"
            navigator={ this.props.navigator }
            leftButtonText="|||"
            leftButtonAction={ this.props.leftButtonAction }
          />


          <SceneView>

            <TouchableHighlight onPress={ () => this.props.navigator.push(Routes.attendance) }>
              <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 20}}>
                <Text style={{fontSize: 26}}>Take Attendance</Text>
              </View>
            </TouchableHighlight>

          </SceneView>
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