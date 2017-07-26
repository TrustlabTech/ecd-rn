/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import React from 'react'
import PropTypes from 'prop-types'
import IMPComponent from '../Impulse/IMPComponent'
import IMPLog from '../Impulse/IMPLog'
import AndroidBackButton from '../modules/AndroidBackButton'
import {
  View,
  Alert,
  ToastAndroid,
  InteractionManager
} from 'react-native'
import buffer from 'buffer/'
const Buffer = buffer.Buffer

import Api from '../Api'
import Config from '../Config'
import Crypto from '../Crypto'
import Session from '../Session'
import { Colours } from '../GlobalStyles'

import {
  NavBar,
  Button,
  ScrollableWaitableView,
  FormHeading,
  SceneHeading,
  Checkbox
} from '../Components'

const templateUrl = 'https://test.ipdb.io/api/v1/transactions/3d842916193bcc5124befeffca6715d3340a4be07184d0a04a05890ca266ae3e'

const createBulkAttendanceClaim = (template, singleClaims, location, digitalIds) => {
  return new Promise((resolve, reject) => {
    const date = new Date().toISOString()
    // JSON.parse(JSON.stringify()) is a tmp workaround for a tedious object reference issue
    const claimObjectSample = JSON.parse(JSON.stringify(template.claim)),
          verifiableClaimSample = JSON.parse(JSON.stringify(template))

    let claimObject = claimObjectSample
    claimObject.id = digitalIds.practitioner
    claimObject.deliveredService.practitioner = digitalIds.practitioner
    claimObject.deliveredService.geo.latitude = location.coords.latitude
    claimObject.deliveredService.geo.longitude = location.coords.longitude
    claimObject.deliveredService.attendees = singleClaims

    Crypto.sign(new Buffer(JSON.stringify(claimObject))).then(signature => {
      let verifiableClaim = verifiableClaimSample
      verifiableClaim.issuer = digitalIds.centre
      verifiableClaim.issued = date
      verifiableClaim.claim = claimObject
      verifiableClaim.signature.created = date
      verifiableClaim.signature.signatureValue = signature

      resolve(verifiableClaim)
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * A scene allowing the user to submit attendance for the chosen class
 * @extends IMPComponent
 * */
export default class AttendanceScene extends IMPComponent {

  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      classData: [],
      attendanceData: [],
      initialised: false,
      showProgress: false,
    }

    this._goBack = this._goBack.bind(this)
  }

  componentDidMount() {
    this._fetchData()
  }

  _goBack() {
    this.navigator.pop()
      this.setState({loaded: false})
  }

  _hardwareBackHandler () {
    this._goBack()
    return true
  }

  /**
   * Fetch data for this scene from the server
   * @memberof AttendanceScene
   * @returns {undefined}
   */
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
        IMPLog.error(error.toString(), this._fileName)
      } else {
        // TODO: GA
        // Sentry.captureEvent(error.stack, this._fileName)
      }

      Alert.alert(
        Config.errorMessage.network.title,
        Config.errorMessage.network.message,
        [{text: "Okay"}]
      )
      this._goBack()
    })
  }

  /**
   * Initialise the attendanceData based on the classData
   * received from the server
   */
  initAttendance (classData) {
    return classData.map( x =>
      ({ id: x.id, givenName: x.given_name, familyName: x.family_name, checked: true })
    )
  }

  /**
   * Press a checkbox and change the checked value
   */
  pressCheckbox (id, attendanceData ) {
    return attendanceData.map( (x) =>
      x.id === id ?({ ...x, checked: !x.checked }) : x
    )
  }

  /**
   * Select all checkboxes
   */
  selectAll (attendanceData) {
    setState({
      attendanceData: attendanceData.map(x =>
        x.checked = true
    )})
  }

  /**
   * Count number of children not selected
   */
  countAbsent = attendanceData =>
    attendanceData.reduce( (a, x) =>
      x.checked ? a : a + 1 ,0)

  /**
   * Generate a summary for comfirmation
   */
  summary = attendanceData =>
    "Are you sure you want to submit attendance with " +
    ( attendanceData.length - this.countAbsent(attendanceData) ) +
    " of " +
    attendanceData.length +
    " children present?"
  
  /**
   * Make the checkboxes based on attendanceData
   */
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

  /**
   * Get the GPS location from android and run
   * a function if successful
   */
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

  /**
   * Upload the attendance data to the server
   */
  uploadData = async (location, attendanceData) => {
    this.setState({ showProgress: true })
    const sessionState = Session.getState()

    // submit attendence on v1 endpoint
    let json = {}
    try {
      json = await Api.submitAttendance(
        location,
        this.props.route.centreId,
        this.props.route.classId,
        attendanceData,
        sessionState.userData._token
      )
    } catch (e) {
      console.log(e)
      // TODO: GA
      this.alertAndPop('Attendence not submitted')
      return false
    }

    // get template from IPD
    let templateJson = {}
    try {
      const templateResponse = await fetch(templateUrl)
      templateJson = await templateResponse.json()
    } catch (e) {
      console.log(e)
      // TODO: GA
      this.alertAndPop('Could not get verifiable claim template')
      return false
    }

    // actual template
    const template = JSON.parse(JSON.stringify(templateJson.asset.data))

    // digital IDs of the involved entities from api v2 response
    const digitalIds = {
      centre: Session.getState().userData.user.centre.did,
      practitioner: Session.getState().userData.user.did
    }

    const date = new Date().toISOString()

    // create all single verifiable claims
    const promises = attendanceData.map(childData => {
      return new Promise((resolve, reject) => {
        // JSON.parse(JSON.stringify()) is a tmp workaround for a tedious object reference issue
        const attendeeSample = JSON.parse(JSON.stringify(template.claim.deliveredService.attendees)),
              claimObjectSample = JSON.parse(JSON.stringify(template.claim)),
              verifiableClaimSample = JSON.parse(JSON.stringify(template))
        // subject portion
        let attendee = attendeeSample
        attendee.id = childData.id,
        attendee.date = date
        attendee.attended = childData.checked || false
        // claim portion
        let claimObject = claimObjectSample
        claimObject.id = digitalIds.practitioner
        claimObject.deliveredService.practitioner = digitalIds.practitioner
        claimObject.deliveredService.geo.latitude = location.coords.latitude
        claimObject.deliveredService.geo.longitude = location.coords.longitude
        claimObject.deliveredService.attendees[0] = attendee

        Crypto.sign(new Buffer(JSON.stringify(claimObject))).then(signature => {
          // verifiable claim portion
          let verifiableClaim = verifiableClaimSample
          verifiableClaim.issuer = digitalIds.centre
          verifiableClaim.issued = date
          verifiableClaim.claim = claimObject
          verifiableClaim.signature.created = date
          verifiableClaim.signature.signatureValue = signature

          resolve(verifiableClaim)
        }).catch(e => {
          reject(e)
        })
      })
    })

    // group all signed verifiable claims for creating the bulk claim
    let singleClaims = []
    try {
      singleClaims = await Promise.all(promises)
    } catch (e) {
      console.log(e)
      // TODO: GA
      this.alertAndPop('Could not create verifiable claims')
      return false
    }

    // create bulk attendence verifiable claim
    let bulkAttendanceClaim = {}
    try {
      bulkAttendanceClaim = await createBulkAttendanceClaim(template, singleClaims, location, digitalIds)
    } catch (e) {
      console.log(e)
      // TODO: GA
      this.alertAndPop('Could not create verifiable claims')
      return false
    }

    // submit the verifiable claims to api v2
    try {
      const centreId = sessionState.userData.user.centre_id,
            token = sessionState.userData._token,
            attendanceClaimResponse = await Api.submitAttendanceClaim(centreId, bulkAttendanceClaim, singleClaims, token)

      if (attendanceClaimResponse.success)
        this.alertAndPop('All verifiable claims have been uploaded', 'Success')
      else
        throw new Error(attendanceClaimResponse.error || '')

    } catch (e) {
      console.log(e)
      // TODO: GA
      this.alertAndPop('Could not submit verifiable claims')
      return false
    }
  }

  /**
   * Submit the attendance.
   * Get the location and upload the data if successful
   */
  submit = attendanceData => {

    Alert.alert(
      'Submit attendance?',
      this.summary(attendanceData),
      [
        {
          text: 'Yes',
          onPress: () => {
            this.getLocation((location) => this.uploadData(location, attendanceData) )
          }
        },
        {text: 'No'}
      ]
    )
  }

  alertAndPop = (message, title = 'Error') => {
    if (this.state.showProgress)
      this.setState({ showProgress: false })
    
    Alert.alert(title, message, [{ text: 'Okay', onPress: this._goBack }])
  }

  render() {
    super.render()

    const CheckBoxes = this.makeCheckboxes(this.state.attendanceData) || null

    return (

      <View style={{flex: 1, backgroundColor: Colours.sceneBackgroundColour}}>
        <AndroidBackButton onPress={ () => this._hardwareBackHandler()}/>

        <NavBar
          navigator={this.props.navigator}
          showProgress={this.state.showProgress}
          leftButtonAction={ () => this._goBack() } />

        <ScrollableWaitableView loaded={this.state.loaded}>

          <SceneHeading text="Attendance"/>

          <FormHeading text={this.props.route.className}/>

          <View style={{flex: 1, flexDirection: 'column'}}>

            {CheckBoxes}

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
              <Button text="Submit" onPress={ () => this.submit(this.state.attendanceData) }/>
            </View>

          </View>

        </ScrollableWaitableView>

      </View>
    )
  }
}
