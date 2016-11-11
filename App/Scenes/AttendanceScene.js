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
    this.hasInit = false
    this.attendanceData = []
  }



  componentWillMount() {
    this.actions.fetchClass(
      this.classId,
      this.token
    )
  }

  pressCheckBox(id) {
    const checked = this.attendanceData[id].checked
    this.attendanceData[id].checked = !checked
    this.forceUpdate()
  }

  selectAll() {
    this.attendanceData.forEach((result, i) => {
      result.checked = true
    })
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

    var Checkboxes = null
    if(this.classData) {
      Checkboxes = this.classData.map( (result, i) => {
        if(!this.hasInit) {
          this.attendanceData[i] = {
            checked: false,
            id: result.id
          }
        }
        return (
          <Checkbox
            key={i}
            width={300}
            text={result.given_name + ' ' + result.family_name}
            onPress={ () => this.pressCheckBox(i) }
            checked={this.attendanceData[i].checked}
          />
        )
      })
      this.hasInit = true
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
            {Checkboxes}
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingRight: 10
            }}>
              <Button text="Select All" onPress={ () => this.selectAll() }/>
            </View>
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