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
import * as appActions from '../Actions/App'
import { ModalMode } from '../Components/WaitModal'

class AttendanceScene extends Component {

  constructor(props) {
    super(props)
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

  getSummaryString() {
    let absent = 0
    let total = this.attendanceData.length
    this.attendanceData.forEach((result)=> {
      if(result.checked == false) absent++
    })
    return (total - absent) + " of " + total
  }

  submit() {

    var summary = "Are you sure you want to submit attendance with "+this.getSummaryString()+ " children present?"

    this.props.dispatch(
      appActions.setModal({
      modalVisible: true,
      modalText:  summary ,
      modalMode: ModalMode.CONFIRM,
      modalOnPositive: () => {
        this.props.dispatch(appActions.setModal({
          modalVisible: true,
          modalText: "Getting location",
          modalMode: ModalMode.WAITING
        }))
        navigator.geolocation.getCurrentPosition((location) => {
          this.actions.submit(
            location,
            this.centreId,
            this.classId,
            this.attendanceData,
            this.token,
            this.props.navigator
          )
          this.props.dispatch(appActions.setModal({
            modalVisible: true,
            modalText: "Uploading Data",
            modalMode: ModalMode.WAITING
          }))
        }, (error) => {
          this.props.dispatch(appActions.setModal({
            modalText: "Uploading failed. Please ensure GPS is enabled",
            modalMode: ModalMode.OKAY,
            modalVisible: true,
            modalOnPositive: () => {}
          }))
        },{
          timeout: 5000
        })
      }
    }))

  }

  goBack() {
    // first set app.classData = null to prevent crash
    this.props.dispatch(appActions.setClass(null))
    // Then go back
    setTimeout(() => this.props.navigator.popN(2))
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
            style={'switch'}
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

      <View style={{flex: 1}}>

        <NavBar
          title="ECD APP"
          navigator={ this.props.navigator }
          leftButtonText="Back"
          leftButtonAction={ () => this.goBack() }

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
              <Button text="Submit" onPress={ () => this.submit() }/>
            </View>
          </View>
        </SceneView>


      </View>
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