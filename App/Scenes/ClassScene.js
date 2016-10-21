import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import Scene from '../Components/Scene'
import SceneView from '../Components/SceneView'
import NavBar from '../Components/NavBar'
import Config from '../Config'

export default class ClassScene extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: true,
      fetching: true,
      children: []
    }
  }

  componentWillMount() {
    this.setState({
      fetching: true,
      modalVisible: true
    })
    this.fetchChildren()
  }

  render() {
    return (
      <Scene>
        <WaitModal
          visible= { this.state.modalVisible }
        />
        <NavBar
          title="Class"
          navigator={ this.props.navigator }
        />
        <SceneView>
          <Text>Passed param:{this.props.route.className}</Text>
          <Text>Title:{this.props.route.classId}</Text>
        </SceneView>
      </Scene>
    )
  }

  fetchChildren = (classId) => {
    this.setState({
      fetching: true
    })

    fetch(Config.http.baseUrl + 'children.php?classId='+classId, {
      method: 'GET'
    })

    .then( (response) =>
      response.json()
    )

    .then( (repsoneJson) => {
      this.setState({
        children: responseJson.children,
        fetching: false,
        modalVisible: false
      })
    })

    .catch( (error) => {
      console.log("ClassScene:fetchChildren")
      this.setState({
        error: "Network Error",
        fetching: false
      })
    })
  }
}