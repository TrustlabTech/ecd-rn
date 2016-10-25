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
import Routes from '../Routes'
import SceneHeading from '../Components/SceneHeading'
import { FontSizes } from '../GlobalStyles'

export default class AttendanceScene extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fetching: true,
      modalVisible: true,
      error: null,
      classes: []
    }
  }

  componentWillMount() {
    console.log("Component will mount")
    this.setState({
      fetching: true,
      error: null,
      modalVisible: true
    })
      this.fetchClasses()
  }

  render() {
    let Heading = null
    let Buttons = null
    if(this.state.classes.length > 0) {

      Buttons = this.state.classes.map( (result) => {

        return (
          <FormButton
            key={result.id}
            text={result.name}
            width={200}
            height={50}
            onPress={ () =>
              this.props.navigator.push({...Routes.class, className: result.name, classId: result.id })
            }
          />

      )})

    }

    return (

      <Scene>
        <WaitModal
          animating= { this.state.fetching }
          visible={ this.state.modalVisible }
          text={ this.state.error ? this.state.error : "Loading" }
          navigator={ this.props.navigator }
          popOnClose={ true }
          ref="waitmodal"
        />
        <NavBar
          title="Attendance"
          navigator={ this.props.navigator }
          leftButtonText="Back"
          leftButtonAction={ () => this.props.navigator.pop() }
        />
        <SceneView>
          <SceneHeading text="Select Class"/>
          <View style={{alignItems: 'center'}}>
            {Buttons}
          </View>
        </SceneView>


      </Scene>
    )
  }

  fetchClasses = () => {
    console.log("Fetching classess....")
    this.setState({
      fetching: true,
      modalVisible: true,
      error: null
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
        modalVisible: false,
        fetching: false
      })
    })


    .catch( (error) => {
      console.log('AttendanceScene:fetchClasses', error)
      this.setState({
        error: "Network Error",
        fetching: false
      })
    })
  }
}