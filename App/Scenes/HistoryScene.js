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
  View,
  Text,
  Alert,
  InteractionManager
} from 'react-native'
import moment from 'moment'

import Sentry from '../Sentry'
import Config from '../Config'
import Session from '../Session'
import Api from '../Api'
import { FontSizes } from '../GlobalStyles'

import {
  ScrollableWaitableView,
  NavBar,
  SceneHeading,
  FormHeading,
  Button,
  HistoryDayItem
} from '../Components'

/** A scene for viewing the attendance history of the centre */
export default class HistoryScene extends IMPComponent {


  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      historyData: [],
      month: moment(new Date()).month() + 1,
      year: moment(new Date()).year()
    }
  }


  componentDidMount() {
    super.componentDidMount()
    this._fetchData(this.state.month, this.state.year)
  }

  _goBack() {
    if(!Config.debug)
      Sentry.addNavigationBreadcrumb(this._className, 'HistoryScene', 'MainScene')

    this.navigator.pop()
  }

  _hardwareBackHandler() {
    this._goBack()
    return true
  }

  /**
   * Fetch server data needed to render the page
   * @memberof
   * @returns {undefined}
   */
  _fetchData() {
    this.setState({
      loaded: false
    })
    const sessionState = Session.getState()

    Api.fetchHistory(
      sessionState.userData.user.centre_id,
      this.state.year,
      this.state.month,
      sessionState.userData._token
    )

    .then((data) => {
      setTimeout(() => {
        this.setState({
          historyData: data,
          loaded: true
        })
      },Config.sceneTransitionMinumumTime)
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

  nextMonth () {
    // get current month/year
    const currentMoment = moment(new Date(this.state.year, this.state.month - 1))

    // add one month
    const nextMonthMoment = currentMoment.add(1,'M')

    // set state to these new values
    this.setState({
      month: nextMonthMoment.month() + 1,
      year: nextMonthMoment.year()
    })
    this._fetchData()
  }

  previousMonth () {
    // get current month/year
    const currentMoment = moment(new Date(this.state.year, this.state.month - 1))

    // subtract one month
    const nextMonthMoment = currentMoment.subtract(1,'M')

    // set state to these new values
    this.setState({
      month: nextMonthMoment.month() + 1,
      year: nextMonthMoment.year()
    })
    this._fetchData()
  }

  /**
   * Convert the api data to a more appropriate form
   */
  reformatHistory (z) {

    let days = []

    // First create an object for each day
    z.forEach( (x, i) => {
      const dayOfMonth = moment(x.attendance_date).date()
      days[dayOfMonth] = {
        day: dayOfMonth,
        absent: [],
        present: []
      }
    })

    // Populate by sorting between absent and present
    z.forEach((x, i) => {

      const entry = {class_name: x.class_name, given_name: x.given_name, family_name: x.family_name}
      const dayOfMonth = moment(x.attendance_date).date()

      if(x.attended === 1) {
        days[dayOfMonth].present.push(entry)
      } else {
        days[dayOfMonth].absent.push(entry)
      }

    })
    return days
  }

  /**
   * @returns {Component} MonthNavButtons
   */
  MonthNavButtons = () =>
 (<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10}}>
    <View style={{flex: 1, marginLeft: 5, marginRight: 5, marginTop: 10, marginBottom: 10}}>
      <Button text="Previous Month" style={{fontSize: FontSizes.xSmall}} onPress={ () => this.previousMonth()}/>
    </View>
    { // What is one month in the future in relation to the current page view ?
    moment(new Date()).add(1,'M').diff(moment(new Date(this.state.year, this.state.month + 1))) >= 0 ?

   (<View style={{flex: 1, marginLeft: 5, marginRight: 5, marginTop: 10, marginBottom: 10}}>
      <Button text="Next Month" style={{fontSize: FontSizes.xSmall}} onPress={ () => this.nextMonth()}/>
    </View>)
    :
    null }

  </View>)


    /**
     * Make an array of HistoryDayItem components based on
     * z (data), month and year.
     * @param {Array} z - data
     * @param {number} month - The month
     * @param {number} year - The year
     * @returns {Array} components - An array containing the resulting components
     */
    makeHistoryDayItems = (z, month, year) =>
      z.map((x) =>
        (<HistoryDayItem
          key={x.day}
          day={x.day}
          month={month}
          absentChildren={x.absent}
          totalChildren={(x.absent.length + x.present.length)}
        />)
      )

  /**
   * Create either an array of HistoryDayItem components or a
   * text component informing the user that there was no data.
   */
  makeMainView = () => {
    const items = this.makeHistoryDayItems(this.reformatHistory(this.state.historyData), this.state.month, this.state.year)
    if(items.length > 0) {
      return items
    } else {
      return (
        <Text>No attendance data was recorded for this month</Text>
      )
    }
  }

  render() {
    super.render()
    return (
      <View style={{flex: 1}}>
        <AndroidBackButton onPress={ () => this._hardwareBackHandler()}/>
        <NavBar
          navigator={ this.props.navigator }
          leftButtonAction={ () => this._goBack() }
        />
        <ScrollableWaitableView loaded={this.state.loaded}>

          <SceneHeading text="Attendance History"/>
          <FormHeading text={moment().year(this.state.year).month(this.state.month - 1).format("MMMM YYYY")}/>
          <View style={{flex: 1, marginLeft: 15}}>
              {this.makeMainView()}
          </View>

          <this.MonthNavButtons/>

        </ScrollableWaitableView>
      </View>
    )
  }
}