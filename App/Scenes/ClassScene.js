import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Scene from '../Components/Scene'
import SceneView from '../Components/SceneView'
import NavBar from '../Components/NavBar'
import FormHeading from '../Components/FormHeading'
import Button from '../Components/Button'
import Config from '../Config'
import Routes from '../Routes'
import SceneHeading from '../Components/SceneHeading'
import * as classActions from '../Actions/Class'
import * as appActions from '../Actions/App'
import { ModalMode } from '../Components/WaitModal'
import Api from '../Api'
import Sentry from '../Sentry'

class ClassScene extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    Sentry.addBreadcrumb('ClassScene', 'componentWillMount')
  }

  goBack() {
    setTimeout(() => this.props.navigator.pop(),0)
    this.props.dispatch(appActions.setCentre(null))
  }

  takeAttendance(val) {

    // Open modal
    this.props.dispatch(appActions.setModal({
      modalVisible: true,
      modalText: "Please wait",
      ModalMode: ModalMode.WAITING
    }))

    // Fetch remote data
    Api.fetchClass(
      val.id,
      this.props.state.App.userData._token
    ).then( (data) => {

      // if(Config.debug && Config.debugNetwork)
      //   console.log('Api.fetchClass: ',data)
      // Handle result
      if(data.error) alert(data.error)
      else {



        // Close modal
        this.props.dispatch(appActions.setModal({
          modalVisible: false
        }))

        // Set class data
        // this.props.dispatch(appActions.setClass(data))

        // Clear centre data
        this.props.dispatch(appActions.setCentre(null))

        // Change scene
        this.props.navigator.push({
          ...Routes.attendance,
          classData: data
        })

      }
    }).catch((error) => {

      // Close the modal
      this.props.dispatch(appActions.setModal({
        modalVisible: false
      }))

      alert(error)
    })
  }

  render() {
    var items = null

    // Check if data is available yet
    if( this.props.state.App.centreData ) {

      items =
      <View style={{flex: 1, alignItems: 'center'}}>
      {this.props.state.App.centreData.map((val,i) =>
        <Button
        disabled={val.attended}
        disabledText={"Attendance has already been submitted for "+val.name+" today."}
        width={250}
        key={i}
        text={val.name}
        onPress={
          () => this.takeAttendance(val)
        }
        />
      )}
      </View>
    }

    return (
      <View style={{flex: 1}}>
        <NavBar
          navigator={ this.props.navigator }
          leftButtonText="Back"
          leftButtonAction={ () => this.goBack() }
        />
        <SceneView>
          <SceneHeading text="Take Attendance"/>
          <FormHeading text="Select Class"/>
          <View style={{
            marginLeft: 20,
            marginRight: 20
          }}>
            {items}
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
    actions: bindActionCreators(classActions,dispatch)
  })
)(ClassScene)