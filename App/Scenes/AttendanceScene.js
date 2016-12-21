/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import IMPComponent from '../Impulse/IMPComponent'
import IMPLog from '../Impulse/IMPLog'
import AndroidBackButton from 'react-native-android-back-button'
import {
  View,
  Alert,
  ToastAndroid
} from 'react-native'

import Config from '../Config'
import Api from '../Api'
import Sentry from '../Sentry'
import { Colours } from '../GlobalStyles'
import Session from '../Session'

import NavBar from '../Components/NavBar'
import Button from '../Components/Button'
import ScrollableScene from '../Components/ScrollableScene'
import FormHeading from '../Components/FormHeading'
import SceneHeading from '../Components/SceneHeading'
import Checkbox from '../Components/Checkbox'

export default class AttendanceScene extends IMPComponent {

  constructor(props) {
    super(props)
    this.state = {
      classData: [],
      attendanceData: [],
      initialised: false,
      loaded: false
    }
  }

  componentWillMount() {
    super.componentWillMount()
    this._fetchData()
  }

  componentWillFocus() {
    super.componentWillFocus()
    this._fetchData()
  }

  _goBack() {
    this.navigator.pop()
    this.setState({loaded: false})
  }

  _hardwareBackHandler = () => {
    this._goBack()
    return true
  }

  _fetchData() {
    const sessionState = Session.getState()

    Api.fetchClass(
      this.props.route.classId,
      sessionState.userData._token
    )

    .then((data) => {

      // If server reports error
      if(data.error){
        if(Config.debug) {
          IMPLog.error(data.error,this._fileName)
        } else {
          alert(data.error)
        }
        this._goBack()
      }

      // Data fetched
      Session.update({classData: data})

      this.setState({
        loaded: true,
        attendanceData: this.initAttendance(data)
      })
    })

    .catch((error) => {
      if(Config.debug) {
        console.log('Error ' + error.toString())
        IMPLog.error(error.toString(), this._fileName)
      } else {
        Sentry.captureEvent(error.stack, this._fileName)
      }

      Alert.alert(
        Config.errorMessage.network.title,
        Config.errorMessage.network.message,
        [{text: "Okay"}]
      )
      this._goBack()
    })
  }

  // Initialise the attendanceData
  initAttendance = classData =>
    classData.map( x =>
      ({ id: x.id, givenName: x.given_name, familyName: x.family_name, checked: true })
    )

  // Press a checkbox and change the checked value
  pressCheckbox = (id, attendanceData ) =>
    attendanceData.map( (x) =>
      x.id === id ?({ ...x, checked: !x.checked }) : x
    )

  // Select all checkboxes
  selectAll = attendanceData => setState({
    attendanceData: attendanceData.map((x) =>
      x.checked = true )
  })

  // Count number of children not selected
  countAbsent = attendanceData =>
    attendanceData.reduce( (a, x) =>
      x.checked ? a : a + 1 ,0)

  // Generate a summary for comfirmation
  summary = attendanceData =>
    "Are you sure you want to submit attendance with " +
    ( attendanceData.length - this.countAbsent(attendanceData) ) +
    " of " +
    attendanceData.length +
    " children present?"

  // Make the checkboxes based on attendanceData
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

  getLocation = onSuccess =>
    navigator.geolocation.getCurrentPosition(
      location =>
        onSuccess(location)
      ,
      error => {
        Alert.alert(
          'Location unavailable',
          'Your location could not be determined. Please ensure location is enabled.'
        )
        this.setModal({visible: false})
      }
    )

  uploadData = (location, attendanceData) => {

    this.setModal({visible: true})
    const sessionState = Session.getState()
    Api.submitAttendance(
      location,
      this.props.route.centreId,
      this.props.route.classId,
      attendanceData,
      sessionState.userData._token
    ).then( (data) => {
      // We're done
      this.setModal({visible: false})
      this._goBack()
      ToastAndroid.show('Upload complete', ToastAndroid.SHORT)
    })

    .catch((error) => {

      this.setModal({visible: false})

      if(Config.debug) {
        alert(this._fileName + " " + error.toString())
        console.log(this._fileName + " " + error.stack)
      } else {
        Sentry.captureEvent(error.stack,this._fileName)
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
        {
          text: 'Yes',
          onPress: () => {
            this.setModal({visible: true})
            this.getLocation((location) => this.uploadData(location, attendanceData) )
          }
        },
        {text: 'No'}
      ]
    )
  }



  render() {
    super.render()

    const CheckBoxes = this.makeCheckboxes(this.state.attendanceData) || null

    return (

      <View style={{flex: 1, backgroundColor: Colours.offWhite}}>
        <AndroidBackButton onPress={ () => this._hardwareBackHandler()}/>

        <NavBar
          navigator={ this.props.navigator }
          leftButtonText="Back"
          leftButtonAction={ () => this._goBack() }
        />

        <ScrollableScene loaded={this.state.loaded}>

          <SceneHeading text="Attendance"/>

          <FormHeading text={this.props.route.className}/>

          <View style={{flex: 1, flexDirection: 'column'}}>

            {CheckBoxes}

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
              <Button text="Submit" onPress={ () => this.submit(this.state.attendanceData) }/>
            </View>

          </View>

        </ScrollableScene>

      </View>
    )
  }

}