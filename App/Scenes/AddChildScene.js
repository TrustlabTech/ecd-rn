/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import IMPComponent from '../Impulse/IMPComponent'
import IMPLog from '../Impulse/IMPLog'
import AndroidBackButton from 'react-native-android-back-button'
import {
  Text,
  View,
  Alert,
  StyleSheet,
  Picker,
  DatePickerAndroid
} from 'react-native'

import moment from 'moment'

import Config from '../Config'
import Routes from '../Routes'
import { FontSizes } from '../GlobalStyles'
import Api from '../Api'
import Sentry from '../Sentry'
import Session from '../Session'

import ScrollableWaitableView from '../Components/ScrollableWaitableView'
import SceneHeading from '../Components/SceneHeading'
import FormHeading from '../Components/FormHeading'
import NavBar from '../Components/NavBar'
import TextField from '../Components/TextField'
import Button from '../Components/Button'
import Selector from '../Components/Selector'

/**
 * A scene for adding children to the centre
 * @extends IMPComponent
 */
export default class AddChildScene extends IMPComponent {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      classData: [],
      givenName: '',
      familyName: '',
      dateOfBirth: null,
      classSelected: null
    }
  }

  _mockData() {
    return [
      'Class 1',
      'Class 2',
      'Class 3',
      'Class 4',
      'Class 5',
      'Class 6'
    ]
  }

  componentWillFocus() {
    super.componentWillFocus()
    this._fetchData()
  }

  componentWillMount() {
    super.componentWillFocus()
    this._fetchData()
  }

  /**
   * Fetch server data needed to render the page
   * @returns {undefined}
   */
  _fetchData() {
    // Fetch list of available classes
    this.setState({
      classData: this._mockData(),
      loaded: true
    })
  }

  _hardwareBackHandler = () => {
    this._goBack()
    return true
  }

  _goBack() {
    this.navigator.pop()
    this.setState({
      loaded: false
    })
  }

  _submit() {
    // submit the form
  }

  _pickDateOfBirth() {

    DatePickerAndroid.open({
      date: new Date(),
      mode: 'spinner'
    })

    .then( ({action, year, month, day}) => {
      if(year && month && day) {
        this.setState({
          dateOfBirth: new Date(year, month, day)
        })
      }
    })

    .catch( (error) => {
      if(Config.debug) IMPLog.error('Could not open date picker', this._fileName)
    })

  }

  _friendlyDate() {
    if(this.state.dateOfBirth === null) {
      return ''
    } else {
      return moment(this.state.dateOfBirth).format('Do MMMM YYYY')
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <AndroidBackButton onPress={ () => this._hardwareBackHandler() }/>

        <NavBar
          navigator={ this.props.navigator }
          leftButtonText="Back"
          leftButtonAction={ () => this._goBack() }
        />

        <ScrollableWaitableView loaded={this.state.loaded}>
          <SceneHeading text="Add Child"/>
          <View style={{marginLeft: 20, marginRight: 20}}>

            <Text style={{fontSize: FontSizes.small}}>Class:</Text>
            <Selector
              selectedValue={this.state.classSelected}
              onValueChange={ (classSelected) => this.setState({classSelected: classSelected}) }
              items={this.state.classData}
            />

            <Text style={{fontSize: FontSizes.small}}>First Name:</Text>
            <TextField
              value={ this.state.givenName }
              ref="givenName"
              onChangeText={ text => this.setState({ givenName: text }) }
              returnKeyType="next"
              onSubmitEditing={ () => this.refs.familyName.focus() }
            />

            <Text style={{fontSize: FontSizes.small}}>Family Name:</Text>
            <TextField
              value={ this.state.familyName }
              ref="familyName"
              onChangeText={ text => this.setState({ familyName: text }) }
              onSubmitEditing={ () => this._submit() }
            />

            <Text style={{fontSize: FontSizes.small}}>Date Of Birth:</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginRight: 5}}>

              <View style={{
                width: 180,
                height: 50,
                marginRight: 3,
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: 5,
                paddingTop: 12
              }}>
                <Text style={{marginLeft: 8, fontSize: FontSizes.p}}>{this._friendlyDate(this.state.dateOfBirth)}</Text>
              </View>

              <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 5, paddingLeft: 5}}>
                <Button text="Select" width={80} onPress={ () => this._pickDateOfBirth() }/>
              </View>

            </View>

            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Button text="Add" onPress={ () => this._submit() }/>
            </View>

          </View>
        </ScrollableWaitableView>

      </View>)
  }
}