/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import IMPComponent from '../Impulse/IMPComponent'
import {
  View,
  Text,
  TouchableHighlight,
  Alert
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
import Session from '../Session'

class ClassScene extends IMPComponent {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      userData: {}
    }
  }

  _hardwareBackHandler = () => {
    this.goBack()
    return true
  }

  _fetchData() {
    Session.getState().then((x) => {
      Api.fetchClasses(
        x.userData.user.id,
        x.userData._token
      ).then((data) => {
        this.setState({
          userData: data,
          loaded: true
        })
      })
    }).catch((error) => {
      console.log('SESSION getState error')
    })
  }

  goBack() {

    if(!config.debug)
      Sentry.addNavigationBreadcrumb(this._className,'ClassScene','MainScene')

    setTimeout(() => this.props.navigator.pop(),0)

    // Clear data so that it must be reloaded
    // this.props.dispatch(appActions.setCentre(null))
  }

  componentWillFocus() {
    super.componentWillFocus()
  }

  componentDidFocus() {
    super.componentDidFocus()
  }

  componentWillMount() {
    super.componentWillMount()
    console.log('CABBAGE')
  }

  componentDidMount() {
    this._fetchData()
    super.componentDidMount()
  }

  componentWillReceiveProps() {
    super.componentWillReceiveProps()
  }

  componentWillUnmount() {
    super.componentWillUnmount()
  }

  takeAttendance(val) {

    // // Open modal
    // this.props.dispatch(appActions.setModal({
    //   modalVisible: true,
    //   modalText: "Please wait",
    //   ModalMode: ModalMode.WAITING
    // }))

    // // Fetch remote data
    // Api.fetchClass(
    //   val.id,
    //   this.props.state.App.userData._token
    // ).then( (data) => {


    //   // Handle result
    //   if(data.error){

    //     // Close the modal
    //     this.props.dispatch(appActions.setModal({modalVisible: false}))

    //     // Handle error
    //     if(Config.debug) {

    //       alert(data.error)
    //       console.log(data.error)
    //     } else {

    //       Sentry.captureEvent(data.error,this.FILENAME)

    //       // Show user the error
    //       Alert.alert(
    //         'Unknown Error',
    //         'There was an error communicating with the server',
    //         [{text: 'Okay'}]
    //       )
    //     }
    //   } else {

    //     // Close modal
    //     this.props.dispatch(appActions.setModal({
    //       modalVisible: false
    //     }))

    //     // Clear centre data
    //     this.props.dispatch(appActions.setCentre(null))

    //     // Change scene
    //     this.props.navigator.push({
    //       ...Routes.attendance,
    //       classData: data
    //     })

    //   }
    // }).catch( (error) => {

    //   // Close the modal
    //   this.props.dispatch(appActions.setModal({
    //     modalVisible: false
    //   }))

    //   // Handle error
    //   if(Config.debug) {
    //     alert(error)
    //     console.log(error.stack)
    //   } else {
    //     Sentry.captureEvent(error.stack, this.FILENAME)
    //     Alert.alert(
    //       'Network Error',
    //       Config.errorMessage.NETWORK,
    //       [{text: 'Okay'}]
    //     )
    //   }
    // })
  }

  render() {
    super.render()
    // var items = null

    // // Check if data is available yet
    // if( this.props.state.App.centreData ) {

    //   items =
    //   <View style={{flex: 1, alignItems: 'center'}}>
    //   {this.props.state.App.centreData.map((val,i) =>
    //     <Button
    //     disabled={val.attended}
    //     disabledText={"Attendance has already been submitted for "+val.name+" today."}
    //     width={250}
    //     key={i}
    //     text={val.name}
    //     onPress={
    //       () => this.takeAttendance(val)
    //     }
    //     />
    //   )}
    //   </View>
    // }

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