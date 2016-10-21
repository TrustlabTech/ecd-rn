import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import Scene from '../Components/Scene'
import SceneView from '../Components/SceneView'
import NavBar from '../Components/NavBar'
export default class ClassScene extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Scene>
        <NavBar
          title="Class"
          navigator={ this.props.navigator }
        />
        <SceneView>
          <Text>Passed param:{this.props.route.param}</Text>
        </SceneView>
      </Scene>
    )
  }
}