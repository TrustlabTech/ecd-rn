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

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as attendanceActions from '../Actions/Attendance'

class AttendanceScene extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    console.log("Component will mount")
    this.props.actions.fetchClasses()
  }

  render() {
    const state = {
      modalText,
      waitingForNetwork,
      showWaitModal
    }

    // const actions = {
    //   close
    // }

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
          animating= { state.waitingForNetwork }
          visible={ state.showWaitModal }
          text={ state.modalText }
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

}

export default connect(
  (state) => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(attendanceActions,dispatch)
  })
)(AttendanceScene)