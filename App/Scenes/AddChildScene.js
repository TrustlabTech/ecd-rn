/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import React from 'react'
import IMPComponent from '../Impulse/IMPComponent'
import IMPLog from '../Impulse/IMPLog'
import AndroidBackButton from 'react-native-android-back-button'
import {
  Text,
  View,
  Alert,
  DatePickerAndroid,
  ToastAndroid
} from 'react-native'

import moment from 'moment'

import Config from '../Config'
import { FontSizes, Colours } from '../GlobalStyles'
import Api from '../Api'
import Session from '../Session'

import {
  ScrollableWaitableView,
  SceneHeading,
  NavBar,
  TextField,
  Button,
  Selector,
  DatePicker
} from '../Components'
import validRSAId from '../validRSAID'
const dismissKeyboard = require('dismissKeyboard')
import MaterialsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Kohana } from 'react-native-textinput-effects'

/**
 * A scene for adding children to the centre
 * @extends IMPComponent
 */
export default class AddChildScene extends IMPComponent {

  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      validationErrors: [],
      classData: [],
      givenName: '',
      familyName: '',
      idNumber: '',
      dateOfBirth: null,
      classSelectedId: null
    }
  }

  componentWillFocus () {
    super.componentWillFocus()
    this._fetchData()
  }

  componentWillMount () {
    super.componentWillMount()
    this._fetchData()
  }

  /**
   * Fetch server data needed to render the page
   * @memberof AddChildScene
   * @returns {undefined}
   */
  _fetchData () {
    // Fetch list of available classes
    const sessionState = Session.getState()
    Api.fetchClasses(
      sessionState.userData.user.id,
      sessionState.userData._token
    )
    .then(data => {
      setTimeout(() => {
        this.setState({
          classData: data,
          loaded: true
        })
      }, Config.sceneTransitionMinumumTime)
    })
    .catch(error => {
      // FIXME with a proper alert
      alert('There was an error fetching the classes' + error.toString())
    })
  }

  _hardwareBackHandler () {
    this._goBack()
    return true
  }

  _goBack () {
    this.navigator.pop()
    this.setState({
      loaded: false
    })
  }

  _validateForm () {
    let validationErrors = []
    // First Name
    if (!this.state.givenName) validationErrors.push('Please enter a first name.')
    // Last Name
    if (!this.state.familyName) validationErrors.push('Please enter a family name.')
    // Date of Birth
    if (!this.state.dateOfBirth) validationErrors.push('Please select a date of birth.')
    // RSA ID
    if (this.state.idNumber.length !== 13 ||
       !this.state.idNumber.match(/^[0-9]{13}/) ||
       !validRSAId(this.state.idNumber)
    ) {
      validationErrors.push('Please enter a valid 13 digit RSA ID number.')
    }

    if (validationErrors.length > 0) {
      Alert.alert(
        'Validation errors',
        validationErrors.join(' '),
        [{text: 'Okay'}]
      )
      return false
    }
    return true
  }

  _submit () {
    if (!this._validateForm()) {
      return
    }
    // submit the form
    const sessionState = Session.getState()
    Api.addChild(
      this.state.givenName,
      this.state.familyName,
      this.state.idNumber,
      this.state.classSelectedId,
      sessionState.userData._token)

    .then(response => {
      console.log('SERVER SAID', response)
      ToastAndroid.show('Child added', ToastAndroid.SHORT)
      this._resetForm()
    })

    .catch(error => {
      // FIXME with a proper alert
      alert('Could not add child ' + error.toString())
    })
  }

  _resetForm () {
    this.setState({
      givenName: null,
      familyName: null,
      idNumber: '',
      classSelectedId: null,
      dateOfBirth: null,
      validationErrors: []
    })
  }

  _pickDateOfBirth () {
    DatePickerAndroid.open({
      date: new Date(),
      mode: 'spinner'
    })

    .then(({action, year, month, day}) => {
      if (action === 'dateSetAction') {
        this.setState({
          dateOfBirth: new Date(year, month, day)
        })
      }
    })

    .catch(error => {
      if (Config.debug) IMPLog.error('Could not open date picker ' + error.toString(), this._fileName)
    })
  }

  _friendlyDate () {
    if (this.state.dateOfBirth === null) {
      return 'Please select'
    } else {
      return moment(this.state.dateOfBirth).format('Do MMMM YYYY')
    }
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <AndroidBackButton onPress={() => this._hardwareBackHandler()} />

        <NavBar
          navigator={this.props.navigator}
          leftButtonAction={() => this._goBack()}
        />

        <ScrollableWaitableView loaded={this.state.loaded}>
          <SceneHeading text='Add Child' />
          <View
            style={{marginLeft: 20, marginRight: 20}}
          >

            {/* Class */}
            <Text style={{fontSize: FontSizes.small}}>Class:</Text>
            <Selector
              selectedValue={this.state.classSelectedId}
              onValueChange={classSelectedId => this.setState({classSelectedId: classSelectedId})}
              items={this.state.classData}
            />
            <Kohana
              style={{ backgroundColor: 'white' }}
              label={'First Name'}
              iconClass={MaterialsIcon}
              iconName={'directions-bus'}
              iconColor={Colours.primaryLowlight}
              labelStyle={{ color: '#000000' }}
              inputStyle={{ color: '#000000' }}
            />
            
            {/* First Name */}
            <Text style={{fontSize: FontSizes.small}}>First Name:</Text>
            <TextField
              value={this.state.givenName}
              ref='givenName'
              onChangeText={text => this.setState({ givenName: text })}
              returnKeyType='done'
              autoCapitalize='sentences'
              onSubmitEditing={() => dismissKeyboard()}
            />

            {/* Family Name */}
            <Text style={{fontSize: FontSizes.small}}>Family Name:</Text>
            <TextField
              value={this.state.familyName}
              ref='familyName'
              onChangeText={text => this.setState({ familyName: text })}
              returnKeyType='done'
              autoCapitalize='sentences'
              onSubmitEditing={() => dismissKeyboard()}

            />

            {/* ID Number */}
            <Text style={{fontSize: FontSizes.small}}>ID Number:</Text>
            <TextField
              value={this.state.idNumber}
              ref='idNumber'
              onChangeText={ text => this.setState({ idNumber: text})}
              returnKeyType='done'
              autoCapitalize='sentences'
              keyboardType='phone-pad'
              onSubmitEditing={() => dismissKeyboard()}
            />

            {/* Date of Birth */}
            <Text style={{fontSize: FontSizes.small}}>Date Of Birth:</Text>
            <DatePicker
              onPress={() => this._pickDateOfBirth()}
              dateOfBirth={this.state.dateOfBirth}
            />

            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Button text='Add' onPress={() => this._submit()} />
            </View>

          </View>
        </ScrollableWaitableView>

      </View>)
  }
}

AddChildScene.propTypes = {
  navigator: React.PropTypes.Component
}
