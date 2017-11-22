/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

'use-strict'

// base libs
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import buffer from 'buffer/'
const Buffer = buffer.Buffer
import {
  View,
  Text,
  Image,
  Alert,
  NetInfo,
  StyleSheet,
  AsyncStorage,
  ToastAndroid,
} from 'react-native'
// components/views
import Button from '../components/Button'
// redux actions
import { setSession, removeAttendancesLocally } from '../actions'
// libs/functions
import Crypto from '../libs/Crypto'
import { Request } from '../libs/network'
// constants
import {
  ICONS,
  COLORS,
  API_HOST,
  AS_USERNAME,
  APP_VERSION,
  BUNDLE_VERSION,
  SUBMIT_ATTENDANCE,
  SUBMIT_ATTENDANCE_CLAIMS,
} from '../constants' 
import { SID_LOGIN } from '../screens'

const templateUrl = 'https://raw.githubusercontent.com/TrustlabTech/amply_schemas/3a656ea/org_ecd_draft.json'

const createBulkAttendanceClaim = (template, singleClaims, location, digitalIds) => {
  return new Promise((resolve, reject) => {
    const date = new Date().toISOString()
    // JSON.parse(JSON.stringify()) is a tmp workaround for a tedious object reference issue
    const
      claimObjectSample = JSON.parse(JSON.stringify(template.claim)),
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

class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isConnected: false,
      submittingAttendance: false
    }

    this.abort = false

    this.getLocation = this.getLocation.bind(this)
    this.onSyncPress = this.onSyncPress.bind(this)
    this.onLogoutPress = this.onLogoutPress.bind(this)
    this.takeAttendance = this.takeAttendance.bind(this)
    this.takeAttendances = this.takeAttendances.bind(this)
  }

  componentDidMount() {
    // this.verifyLocationPermissions()

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectionInfoChange
    )

    NetInfo.isConnected.fetch().done(
      (isConnected) => { !this.abort && this.setState({ isConnected }) }
    )
  }

  componentWillUnmount() {
    this.abort = true
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectionInfoChange
    )
  }

  async onLogoutPress() {
    const username = await AsyncStorage.getItem(AS_USERNAME)
    this.props.navigator.showModal({
      title: 'Login',
      screen: SID_LOGIN,
      navigatorStyle: {
        navBarHidden: true,
        tabBarHidden: true,
      },
      passProps: {
        username: username || ''
      },
      overrideBackPress: true,
    })
    this.props.setSession()
    
    setTimeout(() => {
      this.props.navigator.switchToTab({ tabIndex: 0 })
    }, 500)
  }

  handleConnectionInfoChange = (isConnected) => {
    !this.abort && this.setState({
      isConnected,
    })
  }

  onSyncPress() {
    Alert.alert(
      'Confirmation',
      'Are you sure to sync the attendaces data?',
      [
        { text: 'Cancel' },
        { text: 'Proceed', onPress: this.takeAttendances },
      ]
    )
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: false, timeout: 5000, maximumAge: 1000 * 5 }) // eslint-disable-line no-undef
    })
  }

  async takeAttendances() {
    const promises = this.props.attendances.map(attendance => {
      return new Promise((resolve, reject) => 
                    resolve(this.takeAttendance(attendance))
                    .catch(e => reject(e)))
    })

    let res = []
    try {
      res = await Promise.all(promises)
    } catch (e) {
      console.log(e)
    }

    // check if a takeAttendence is dead
    let check = true
    res.forEach(v => {
      if (!v) {
        check = false
      }
    })

    check && this.props.removeAttendancesLocally()
  }

  async takeAttendance(attendance) {
    let location = null
    try {
      location = await this.getLocation()
    } catch (e) {
      this.setState({ submittingAttendance: false }, () => {
        Alert.alert('Location unavailable', 'Your location could not be determined,\nplease ensure location is enabled.')
      })
      return false
    }

    const attendanceData = attendance.children.map(d => ({
      children_id: d.id, // eslint-disable-line camelcase
      latitude: location.coords.latitude.toString(),
      longitude: location.coords.longitude.toString(),
      attended: d.checked || false
    }))
    
    const
      request = new Request(),
      { session } = this.props,
      { url, options } = SUBMIT_ATTENDANCE(session.token, {
        children: attendanceData,
        centre_class_id: attendance.centre_class_id, // eslint-disable-line camelcase
        centre_id: attendance.centre_id, // eslint-disable-line camelcase
      })

    // check the net status of the app
    if (!this.state.isConnected) {
      this.setState({ submittingAttendance: false }, () => {
        Alert.alert('Device Offline', 'Please, find a network conncection to send data to our systems.', [{ text: 'Ok', onPress: this.props.navigator.pop }])
      })
      return false
    }
  
    try {
      await request.fetch(url, options)
    } catch (e) {
      this.setState({ submittingAttendance: false }, () => {
        Alert.alert('Error', 'Failed to submit attendace, try again later.', [{ text: 'Ok', onPress: this.props.navigator.pop }])
      })
      return false
    }

    // get template from IPD
    let template = {}
    try {
      const templateResponse = await fetch(templateUrl) // eslint-disable-line no-undef
      template = await templateResponse.json()
    } catch (e) {
      this.setState({ submittingAttendance: false }, () => {
        Alert.alert('Error', 'Failed to get Verifiable Claim template, try again later.', [{ text: 'Ok', onPress: this.props.navigator.pop }])
      })
      return false
    }

    // digital IDs of the involved entities from api v2 response
    const digitalIds = {
      practitioner: session.user.did,
      centre: session.user.centre.did,
    }

    const date = new Date().toISOString()

    // create all single verifiable claims
    const promises = attendanceData.map(childData => {
      return new Promise((resolve, reject) => {
        // JSON.parse(JSON.stringify()) is a tmp workaround for a tedious object reference issue
        const
          attendeeSample = JSON.parse(JSON.stringify(template.claim.deliveredService.attendees)),
          claimObjectSample = JSON.parse(JSON.stringify(template.claim)),
          verifiableClaimSample = JSON.parse(JSON.stringify(template))
        // subject portion
        let attendee = attendeeSample
        attendee.id = childData.id,
        attendee.date = date
        attendee.attended = childData.checked || childData.attended || false
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
      this.setState({ submittingAttendance: false }, () => {
        Alert.alert('Error', 'Failed to create children Verifiable Claims.', [{ text: 'Ok', onPress: this.props.navigator.pop }])
      })
      return false
    }

    // create bulk attendence verifiable claim
    let bulkAttendanceClaim = {}
    try {
      bulkAttendanceClaim = await createBulkAttendanceClaim(template, singleClaims, location, digitalIds)
    } catch (e) {
      this.setState({ submittingAttendance: false }, () => {
        Alert.alert('Error', 'Failed to create bulk Verifiable Claim.', [{ text: 'Ok', onPress: this.props.navigator.pop }])
      })
      return false
    }

    const
      claimsRequest = new Request(),
      claimsRequestParams = SUBMIT_ATTENDANCE_CLAIMS(session.token, {
        centreId: attendance.centre_id,
        bulkClaim: bulkAttendanceClaim,
        singleClaims
      })

    // submit the verifiable claims to api v2
    try {
      await claimsRequest.fetch(claimsRequestParams.url, claimsRequestParams.options)

      this.setState({ submittingAttendance: false }, () => {
        ToastAndroid.show('All verifiable claims have been uploaded', ToastAndroid.LONG)
        this.props.navigator.pop()
      })

    } catch (e) {
      this.setState({ submittingAttendance: false }, () => {
        Alert.alert('Error', 'Failed to submit Verifiable Claims.', [{ text: 'Ok', onPress: this.props.navigator.pop }])
      })
      return false
    }
    return true
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Logout */}
        <Button style={styles.button} nativeFeedback={true} onPress={this.onLogoutPress}>
          <Text style={styles.buttonTextTitle}>Logout</Text>
          <Image source={ICONS.exitToApp12} style={styles.rowImage} />
        </Button>
        <Button style={styles.button} nativeFeedback={true} onPress={this.onSyncPress}>
          <Text style={styles.buttonTextTitle}>Sync</Text>
          <Image source={ICONS.sync12} style={styles.rowImage} />
        </Button>
        <View style={styles.appInfoContainer}>
          <Text style={styles.appInfoText}>{APP_VERSION} ({BUNDLE_VERSION})</Text>
          <Text style={styles.appInfoText}>{API_HOST}</Text>
        </View>
      </View>
    )
  }
}
Settings.propTypes = {
  session: PropTypes.object.isRequired,
  setSession: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  removeAttendancesLocally: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.greyWhite,
  },
  button: {
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    borderBottomColor: COLORS.lightGrey,
  },
  buttonTextTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: COLORS.darkGrey2,
  },
  rowImage: {
    width: 12,
    height: 12,
  },
  appInfoContainer: {
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
  },
  appInfoText: {
    fontSize: 12,
    fontWeight: '300',
    color: COLORS.grey,
  },
})

const mapDispatchToProps = (dispatch) => ({
  setSession: () => dispatch(setSession()),
  removeAttendancesLocally: () => dispatch(removeAttendancesLocally())
})

const mapStoreToProps = (store) => {
  return {
    session: store.session,
    attendances: store.offline.attendances
  }
}

export default connect (mapStoreToProps, mapDispatchToProps)(Settings)
