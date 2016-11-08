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
import CheckBox from '../Components/Checkbox'

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

    this.checked = []
  }

  componentWillMount() {
    const classId = this.route.classId
    const token = this.props.state.App.userData._token
    this.actions.fetchClass(classId,token)
  }

  render() {
    this.state = this.props.state.App
    let Buttons = null
    if( this.state.classData) {
      Buttons = this.state.classData.map( (result) => {

        return (
          <CheckBox
            key={result.id}
            text={result.given_name + ' ' + result.family_name}
            onPress={ (checked) =>
              this.checked[result.id] = checked
            }
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
        />
        <SceneView>
          <SceneHeading text="Attendance"/>
          <FormHeading text="CLASS NAME HERE"/>
          <View style={{alignItems: 'center'}}>
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