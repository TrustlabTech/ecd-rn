/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */


import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  Alert,
  ToastAndroid
} from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import NavBar from '../Components/NavBar'
import Button from '../Components/Button'
import Scene from '../Components/Scene'
import SceneView from '../Components/SceneView'
import FormHeading from '../Components/FormHeading'
import SceneHeading from '../Components/SceneHeading'
import Checkbox from '../Components/Checkbox'
import { ModalMode } from '../Components/WaitModal'

import Config from '../Config'
import Routes from '../Routes'
import Api from '../Api'
import Sentry from '../Sentry'

import * as attendanceActions from '../Actions/Attendance'
import * as appActions from '../Actions/App'

import { Colours } from '../GlobalStyles'

class AttendanceScene extends Component {

  FILENAME = 'AttendanceScene.js'

  constructor(props) {
    super(props)
    this.state = {
      classData: [],
      attendanceData: [],
      initialised: false
    }
  }

  componentWillMount() {

    if(Config.debug && Config.debugReact)
      console.log(this.FILENAME,'componentWillMount')
    else
      Sentry.addBreadcrumb('AttendanceScene', 'componentWillMount')

    if(!this.state.initialised) {
      this.setState({
        attendanceData: this.initAttendance(this.props.route.classData),
        initialised: true
      })
    }

  }

  componentWillReceiveProps(props) {

    if(Config.debug && Config.debugReact)
      console.log('AttendanceScene','componentWillReceiveProps')

    if(!this.state.initialised) {
      this.setState({
        attendanceData: this.initAttendance(props.route.classData),
        initialised: true
      })
    }
  }

  initAttendance = classData =>
    classData.map( x =>
      ({ id: x.id, givenName: x.given_name, familyName: x.family_name, checked: false })
    )

  pressCheckbox = (id, attendanceData ) =>
    attendanceData.map( (x) =>
      x.id === id ?({ ...x, checked: !x.checked }) : x
    )

  selectAll = attendanceData => setState({
    attendanceData: attendanceData.map((x) =>
      x.checked = true )
  })

  countAbsent = attendanceData =>
    attendanceData.reduce( (a, x) =>
      x.checked ? a : a + 1 ,0)

  summary = attendanceData =>
    "Are you sure you want to submit attendance with " +
    ( attendanceData.length - this.countAbsent(attendanceData) ) +
    " of " +
    attendanceData.length +
    " children present?"

  makeCheckboxes = attendanceData =>
    attendanceData.map((x, i) =>
      (<Checkbox
        style={'switch'}
        key={i}
        width={300}
        text={x.givenName + ' ' + x.familyName}
        onPress={ () => this.setState({ attendanceData: this.pressCheckbox(x.id, attendanceData)}) }
        checked={x.checked}
      />)
    )

  setModal = (visible, text = "") =>
    this.props.dispatch(appActions.setModal({
      modalVisible: visible,
      modalText: text,
      modalMode: ModalMode.WAITING
    }))

  displayError = (title, friendly, error, retry = null ) => {

    // Ensure modal is closed
    this.setModal(false)

     // Display error
      if(Config.debug) {

        alert(this.FILENAME + "::displayError: " + title + " " + friendly + " " + error)
        console.log(this.FILENAME + "::displayError: " + error)

      } else {

        Sentry.captureEvent("User was shown error: < " + friendly + " > The error was: <" + error.toString() + ">", this.FILENAME)

        let options = [{text: "Okay"}]
        if (retry)
          options.push({text: "Retry", onPress: () => retry()})

        Alert.alert(title, friendly, options)
      }
  }

  getLocation = onSuccess =>
    navigator.geolocation.getCurrentPosition(
      location =>
        onSuccess(location)
      ,
      error =>
        this.displayError("Location Error", "Could not get location. Ensure location is enabled", error)
    )

  uploadData = (location, attendanceData) => {

    this.setModal(true, "Uploading Data")

    Api.submitAttendance(
      location,
      this.props.route.centreId,
      this.props.route.classId,
      attendanceData,
      this.props.state.App.userData._token
    ).then((data) => {

      // Check for error
      if(data.error){

        // Display and log
        this.displayError("Error", "An unknown error occured", data.error)

      } else {

        // Check for error
        if(data) {

          // We're done
          this.goBack()
          ToastAndroid.show('Upload complete', ToastAndroid.SHORT)

        } else {

          //Show and log error
          this.displayError("Error", "An uknown error occured", data)

        }
      }
    }).catch((error) => {

      this.setModal(false)

      // Don't use this.displayError() for errors with stacks
      if(Config.debug) {

        alert(this.FILENAME + " " + error.toString())
        console.log(this.FILENAME + " " + error.stack)

      } else {
        Sentry.captureEvent(error.stack,this.FILENAME)
        Alert.alert(
          'Unknown Error',
          'An unknown error has occured',
          [{text: 'Okay'}]
          )
      }

    })
  }

  submit = attendanceData => {

    Alert.alert(
      'Submit attendance?',
      this.summary(attendanceData),
      [
        // Yes
        {
          text: 'Yes',
          onPress: () => {

            // Open modal
            this.setModal(true, "Getting location")

            // Get location
            this.getLocation((location) => this.uploadData(location, attendanceData) )
          }
        },
        // No
        {text: 'No'}
      ]
    )
  }

  goBack = () => {

    // It's critical not to block here
    setTimeout(() => this.setModal(true, "Please wait"),0)

    // Fetch remote data
    Api.fetchClasses(
      this.props.state.App.userData.user.id,
      this.props.state.App.userData._token
    ).then((data) => {

      // Check for error
      if(data.error) {

        setTimeout(() => this.setModal(false),0)

        if(Config.debug) {

          alert(data.error)
          console.log(data.error)
        } else {

          Sentry.captureEvent("Api.fetchClasses() returned " + data.error.toString(),this.FILENAME)
          Alert.alert(
            'Error',
            'An unknown error has occured',
            [
              { text: 'Retry', onPress: () => this.goBack() },
              { text: 'Cancel', onPress: () => this.setModal(false) }
            ]
          )
        }
      } else {

        // Go back
        this.props.navigator.pop()

        // Set the new data for the next page ASAP
        this.props.dispatch( appActions.setCentre(data) )

        // Clear the state for the page we are leaving after delay
        this.props.dispatch( appActions.setClass([]) )

        this.setModal(false)

     }
    }).catch((error) => {

      this.setModal(false)
      // Show error
      if(Config.debug) {

        alert(error)
        console.log(error)
      } else {

        Sentry.captureEvent("Api.fetchClasses() returned " + error.toString(), this.FILENAME)
        Alert.alert(
            'Error',
            'An unknown error has occured',
            [
              { text: 'Retry', onPress: () => this.goBack() },
              { text: 'Cancel', onPress: () => this.setModal(false) }
            ]
          )
      }
    })
  }

  render() {

    const CheckBoxes = this.makeCheckboxes(this.state.attendanceData) || null
    return (

      <View style={{flex: 1, backgroundColor: Colours.offWhite}}>

        <NavBar
          navigator={ this.props.navigator }
          leftButtonText="Back"
          leftButtonAction={ () => this.goBack() }
        />

        <SceneView>

          <SceneHeading text="Attendance"/>

          <FormHeading text={this.props.route.className}/>

          <View style={{flex: 1, flexDirection: 'column'}}>

            {CheckBoxes}

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
              <Button text="Submit" onPress={ () => this.submit(this.state.attendanceData) }/>
            </View>

          </View>

        </SceneView>

      </View>
    )
  }

}

// Bind Redux state to component props
export default connect(
  (state) => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(attendanceActions,dispatch)
  })
)(AttendanceScene)