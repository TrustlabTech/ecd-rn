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
  Text
} from 'react-native'
import NavBar from '../Components/NavBar'
import ScrollableScene from '../Components/ScrollableScene'
import SceneHeading from '../Components/SceneHeading'
import Sentry from '../Sentry'
import Config from '../Config'
import Session from '../Session'
import IMPLog from '../Impulse/IMPLog'
import HistoryDayItem from '../Components/History/HistoryDayItem'

export default class HistoryScene extends IMPComponent {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      historyData: {}
    }
  }

  componentDidMount() {
    super.render()
  }

  goBack() {
    if(!Config.debug)
      Sentry.addNavigationBreadcrumb(this._className,'HistoryScene','MainScene')
  }

  _fetchData() {
    const sessionState = Session.getState()

    Api.fetchHistory(
      session.userData.user.centre.id
    )

    .then((data) => {
      this.setState({
        historyData: data,
        loaded: true
      })

    })

    .catch((error) => {
      if(Config.debug) {
        IMPLog.error(error.toString(),this._fileName)
      }
      Alert.alert(
        Config.errorMessage.network.title,
        Config.errorMessage.network.message,
        [{text: "Okay"}]
      )
    })
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
        <ScrollableScene loaded={true}>
          <SceneHeading text="Attendance History"/>
          <HistoryDayItem
            absentChildren={[{given_name: 'josh', family_name: 'smoth', className: 'Class five'}]}
            date="22nd December"
            totalChildren={14}
          />
        </ScrollableScene>
      </View>
    )
  }
}