import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native'

import NavBar from '../Components/NavBar'
import FormButton from '../Components/FormButton'
import WaitModal from '../Components/WaitModal'
import Scene from '../Components/Scene'
import SceneView from '../Components/SceneView'
import Config from '../Config'

export default class AttendanceScene extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fetching: false,
      classes: []
    }
  }

  componentWillMount() {
    this.setState({
      fetching: true
    })
      this.fetchClasses()
  }

  render() {
    let Heading = null
    let Buttons = null
    if(this.state.classes.length > 0) {

      Buttons = this.state.classes.map( (result) => (
        <FormButton key={result.id} text={result.name} width={200} height={50} onPress={ () => alert("Hah!") }/>
      )
      )
      Heading = (
        <View style={{marginTop: 20, marginBottom: 20}}>
          <Text style={{fontSize: 22}}>Select Class</Text>
        </View>
      )
    }

    return (
      <Scene>
        <WaitModal
          visible={ this.state.fetching }
          ref="waitmodal"
        />
        <NavBar
          title="Attendance"
          navigator={ this.props.navigator }
          leftButtonText="Back"
          leftButtonAction={ () => this.props.navigator.pop() }
        />
        <SceneView>
          {Heading}
          {Buttons}
        </SceneView>


      </Scene>
    )
  }

  fetchClasses = () => {
    this.setState({
      fetching: true
    })
    fetch(Config.http.baseUrl + 'classes.php', {
      method: 'GET'
    })

    .then((response) => {
      return response.json()
    })

    .then( (responseJson) => {
      this.setState({
        classes: responseJson.classes,
        fetching: false
      })
    })

    .catch( (error) => {
      console.log('AttendanceScene:fetchClasses', error)
      this.setState({
        error: "Network error",
        fetching: false
      })
    })
  }
}