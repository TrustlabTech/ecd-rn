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

import Scene from '../Components/Scene'
import ScrollableScene from '../Components/ScrollableScene'
import NavBar from '../Components/NavBar'
import FormHeading from '../Components/FormHeading'
import Button from '../Components/Button'
import Config from '../Config'
import Routes from '../Routes'
import SceneHeading from '../Components/SceneHeading'
import Api from '../Api'
import Sentry from '../Sentry'
import Session from '../Session'
import IMPLog from '../Impulse/IMPLog'

export default class ClassScene extends IMPComponent {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      userData: {},
      centreData: null
    }
  }

  _hardwareBackHandler = () => {
    this.goBack()
    return true
  }

  _fetchData() {

    const sessionState = Session.getState()

    Api.fetchClasses(
      sessionState.userData.user.id,
      sessionState.userData._token
    ).then((data) => {
      // Session.update({centreData: data})
      this.setState({
        loaded: true,
        centreData: data
      })
    }).catch((error) => {
      if(Config.debug) {
        IMPLog.error(error.toString(), this._fileName)
      }
      Alert.alert(
        Config.errorMessage.network.title,
        Config.errorMessage.network.message,
        [{text: "Okay"}]
      )
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

  componentWillMount() {
    super.componentWillMount()
    this._fetchData()
  }


  takeAttendance(val) {
    const sessionState = Session.getState()

    this.navigator.push({...Routes.attendance, classId: val.id })

    this.setState({loaded: false})
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
              {this.buildList(this.state.centreData)}
            </View>
          </View>
        </ScrollableScene>
      </View>
    )
  }

}
