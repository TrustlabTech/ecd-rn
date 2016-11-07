import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native'

import Scene from '../Components/Scene'
import SceneView from '../Components/SceneView'
import NavBar from '../Components/NavBar'
import Config from '../Config'
import SceneHeading from '../Components/SceneHeading'
import ConfirmModal from '../Components/ConfirmModal'

export default class ClassScene extends Component {

  constructor(props) {
    super(props)
    this.dispatch = this.props.store.dispatch
    this.actions = this.props.actions
    this.navigator = this.props.navigator
    this.route = this.props.route
  }

  render() {

    return (
      <Scene>

        <NavBar
          title="ECD APP"
          navigator={ this.navigator }
        />
        <SceneView>
          <SceneHeading text="Hi!"/>
          <View style={{
            marginLeft: 20,
            marginRight: 20
          }}>
          </View>
        </SceneView>
      </Scene>
    )
  }

}