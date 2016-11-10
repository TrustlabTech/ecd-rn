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
    this.centreId = this.route.centreId
    this.token = this.props.state.App.userData._token
    this.attendanceData = []
  }



  componentWillMount() {
    this.actions.fetchClass(
      this.classId,
      this.token
    )
  }

  pressCheckBox(id) {
    let checkStatus = this.attendanceData[id].checked || false
    this.attendanceData[id] = {
      checked: !checkStatus,
      id: id
    }

    this.forceUpdate()
  }

  submit() {
    navigator.geolocation.getCurrentPosition((location) =>{
      this.actions.submit(
        location,
        this.centreId,
        this.classId,
        this.attendanceData,
        this.token
    )}, (error) => {
      console.log('GPS things didn\'t work')
    },{
      timeout: 5000
    })

  }

  render() {
    this.classData = this.props.state.App.classData

    let Buttons = null
    if( this.classData) {

      Buttons = this.classData.map( (result) => {

        let checked = null
        if(typeof this.attendanceData[result.id] === 'undefined'){
          this.attendanceData[result.id] = {checked: false}
          checked = this.attendanceData[result.id].checked
        } else {
          checked = this.attendanceData[result.id].checked || false
        }
        return (
          <Checkbox
            key={result.id}
            width={300}
            text={result.given_name + ' ' + result.family_name}
            onPress={ () => this.pressCheckBox(result.id) }
            checked={checked}
          />

      )})
    }

    return (

      <Scene dispatch={this.props.store.dispatch}>

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