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
import ScrollableScene from '../Components/ScrollableScene'
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
import IMPLog from '../Impulse/IMPLog'

class ClassScene extends IMPComponent {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      userData: {},
      centreData: {}
    }
    // this.apiData = null
  }

  _hardwareBackHandler = () => {
    this.goBack()
    return true
  }

  _fetchData() {
    // const userId = this.props.state.App.userData.user.id
    // const token = this.props.state.App.userData._token
    const sessionState = Session.getState()

    Api.fetchClasses(
      sessionState.userData.user.id,
      sessionState.userData._token
    ).then((data) => {
      // this.dispatch(appActions.setCentre(data))
      Session.update({centreData: data})
      this.setState({
        loaded: true
      })
    }).catch((error) => {
      if(Config.debug) {
        console.log('Error ' + error.toString())
        IMPLog.error(error.toString(), this._fileName)
      }
      alert('Error' + error.toString())
      this.goBack()
    })

  }

  goBack() {

    if(!Config.debug)
      Sentry.addNavigationBreadcrumb(this._className,'ClassScene','MainScene')


    this.navigator.pop()

    this.setState({loaded: false})
  }

  componentWillFocus() {
    super.componentWillFocus()
    this._fetchData()
  }

  componentDidFocus() {
    super.componentDidFocus()
  }

  componentWillMount() {
    super.componentWillMount()
    this._fetchData()
  }

  componentDidMount() {
    super.componentDidMount()
    // build list
  }

  componentWillReceiveProps() {
    super.componentWillReceiveProps()
  }

  componentWillUnmount() {
    super.componentWillUnmount()
  }

  componentWillUpdate() {
    super.componentWillUpdate()

  }

  takeAttendance(val) {
    const sessionState = Session.getState()

    this.navigator.push({...Routes.attendance, classId: val.id })

    this.setState({loaded: false})
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

  buildList = (data) => {
    if(!data) {
      return null
    } else {
      return data.map((val,i) =>
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
      )
    }
  }

  render() {
    super.render()
    return (
      <View style={{flex: 1}}>
        <NavBar
          navigator={ this.props.navigator }
          leftButtonText="Back"
          leftButtonAction={ () => this.goBack() }
        />
        <ScrollableScene loaded={this.state.loaded}>
          <SceneHeading text="Take Attendance"/>
          <FormHeading text="Select Class"/>
          <View style={{
            marginLeft: 20,
            marginRight: 20
          }}>
            <View style={{flex: 1, alignItems: 'center'}}>
              {this.buildList(Session.getState().centreData)}
            </View>
          </View>
        </ScrollableScene>
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