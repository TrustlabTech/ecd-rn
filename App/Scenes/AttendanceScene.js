import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native'

import NavBar from '../Components/NavBar'
import Button from '../Components/Button'
import WaitModal from '../Components/WaitModal'
import Scene from '../Components/Scene'
import SceneView from '../Components/SceneView'
import FormHeading from '../Components/FormHeading'
import Config from '../Config'
import Routes from '../Routes'
import SceneHeading from '../Components/SceneHeading'
import { FontSizes } from '../GlobalStyles'
import Checkbox from '../Components/Checkbox'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as attendanceActions from '../Actions/Attendance'

class AttendanceScene extends Component {

  constructor(props) {
    super(props)
    this.dispatch = this.props.store.dispatch
    this.actions = this.props.actions
    this.navigator = this.props.navigator
    this.route = this.props.route

    this.classId = this.route.classId
    this.token = this.props.state.App.userData._token
    this.attendanceData = []
  }

  componentWillMount() {
    const coken = this.props.state.App.userData._token
    this.actions.fetchClass(
      this.classId,
      this.token
    )
  }

  pressCheckBox(id) {
    this.attendanceData[id] = !this.attendanceData[id]
    this.forceUpdate()
  }

  submit() {
    
    attendanceActions.submit(
      this.classId,
      this.attendanceData,
      this.token
    )
  }

  render() {
    this.classData = this.props.state.App.classData

    let Buttons = null
    if( this.classData) {
      Buttons = this.classData.map( (result) => {

        return (
          <Checkbox
            key={result.id}
            width={300}
            text={result.given_name + ' ' + result.family_name}
            onPress={ () => this.pressCheckBox(result.id) }
            checked={this.attendanceData[result.id]}
          />

      )})
    }

    return (

      <Scene>

        <NavBar
          title="ECD APP"
          navigator={ this.props.navigator }
          leftButtonText="Back"
          leftButtonAction={ () => this.props.navigator.pop() }
          rightButtonText="Submit"
          rightButtonAction={ () => this.submit() }
        />
        <SceneView>
          <SceneHeading text="Attendance"/>
          <FormHeading text={this.route.className}/>
          <View style={{flex: 1, flexDirection: 'column'}}>
            {Buttons}
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
    actions: bindActionCreators(attendanceActions,dispatch)
  })
)(AttendanceScene)