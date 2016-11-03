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
import WaitModal from '../Components/WaitModal'

class MainScene extends Component {

  constructor(props) {
      super(props)
  }

  render() {
    const state = {
      waitingForNetwork,
      showWaitModal,
      modalText
    } = this.props.state.Main

    const actions = {
      textChange,
      closeModal
    } = this.props.actions

    return (
        <Scene>

          <WaitModal
            animating={ state.waitingForNetwork }
            visible={ state.showWaitModal }
            onPressClose={ () => actions.closeModal() }
            text={ state.modalText }
            ref="waitmodal"
          />

          <NavBar
            title="My Centre"
            navigator={ this.props.navigator }
            leftButtonText="|||"
            leftButtonAction={ this.props.leftButtonAction }
          />


          <SceneView>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
              <Text style={{fontSize: 24}}>Happy Valley Preschool</Text>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
              <Text style={{fontSize: 18}}>Whiteriver, Mpumulanga</Text>
            </View>

            <TouchableHighlight onPress={ () => this.props.navigator.push(Routes.attendance) }>
              <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 20}}>
                <Text style={{fontSize: 26}}>Take Attendance</Text>
              </View>
            </TouchableHighlight>

            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
            <Image source={require('../Images/preschool.jpg')}
              style={{width: 380, height: 380}} />
            </View>


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