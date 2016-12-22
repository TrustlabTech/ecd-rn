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
  Picker
} from 'react-native'

import Config from '../Config'
import Routes from '../Routes'
import { FontSizes } from '../GlobalStyles'
import Api from '../Api'
import Sentry from '../Sentry'
import Session from '../Session'

import Scene from '../Components/Scene'
import SceneHeading from '../Components/SceneHeading'
import FormHeading from '../Components/FormHeading'
import NavBar from '../Components/NavBar'
import TextField from '../Components/TextField'
import Button from '../Components/Button'

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

  render() {
    return (
      <View style={{flex: 1}}>
        <AndroidBackButton onPress={ () => this._hardwareBackHandler() }/>

        <NavBar
          navigator={ this.props.navigator }
          leftButtonText="Back"
          leftButtonAction={ () => this._goBack() }
        />

        <Scene loaded={this.state.loaded}>
          <SceneHeading text="Add Child"/>
          <View style={{marginLeft: 20, marginRight: 20}}>

            <Picker
              selectedValue={this.state.classSelected}
              onValueChange={ (classSelected) => this.setState({classSelected: classSelected}) }
            >
              {this.state.classData.map((x, i) => (<Picker.Item key={i} label={x} value={x}/>) )}
            </Picker>

            <TextField
              value={ this.state.givenName }
              placeholder="Given name"
              ref="givenName"
              onChangeText={ text => this.setState({ givenName: text }) }
              returnKeyType="next"
              onSubmitEditing={ () => this.refs.familyName.focus() }
            />

            <TextField
              value={ this.state.familyName }
              placeholder="Family name"
              ref="familyName"
              onChangeText={ text => this.setState({ familyName: text }) }
              onSubmitEditing={ () => this._submit() }
            />

            <View style={{flex: 1, alignItems: 'center'}}>
              <Button text="Add" onPress={ () => this._submit() }/>
            </View>

          </View>
        </Scene>

      </View>)
  }
}