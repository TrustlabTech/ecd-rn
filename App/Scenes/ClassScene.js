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
  View,
  Alert,
} from 'react-native'

import Config from '../Config'
import Routes from '../Routes'
import Sentry from '../Sentry'
import Session from '../Session'
import Api from '../Api'

import {
  ScrollableWaitableView,
  NavBar,
  SceneHeading,
  FormHeading,
  Button
} from '../Components'

/**
 * A scene for selecting a class in the centre
 * @extends IMPComponent
 */
export default class ClassScene extends IMPComponent {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      userData: {},
      centreData: null
    }
  }
  componentWillFocus() {
    super.componentWillFocus()
    this._fetchData()
  }

  componentWillMount() {
    super.componentWillMount()
    this._fetchData()
  }

  _hardwareBackHandler() {
    this._goBack()
    return true
  }

  /**
   * Fetch server data needed to render the page
   * @memberof ClassScene
   * @returns {undefined}
   */
  _fetchData() {
    const sessionState = Session.getState()
    Api.fetchClasses(
        sessionState.userData.user.id,
        sessionState.userData._token
      ).then((data) => {
        setTimeout(() => {
          this.setState({
            loaded: true,
            centreData: data
          })
        }, Config.sceneTransitionMinumumTime)
      }).catch((error) => {
        if (Config.debug) {
          IMPLog.error(error.toString(), this._fileName)
        }
        Alert.alert(
          Config.errorMessage.network.title,
          Config.errorMessage.network.message,
          [{ text: "Okay" }]
        )
        this._goBack()
      })

  }

  _goBack() {
    if (!Config.debug){
      Sentry.addNavigationBreadcrumb(this._className, 'ClassScene', 'MainScene')
    }

    this.navigator.pop()
    this.setState({ loaded: false })
  }

  takeAttendance(val) {
    this.navigator.push({ ...Routes.attendance, classId: val.id })


    this.setState({ loaded: false })
  }

  buildList(data){
    if (!data) {
      return null
    } else {
      return data.map((val, i) =>
        <Button
        disabled={val.attended}
        disabledText={"Attendance has already been submitted for " + val.name + " today."}
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
      <View style={{ flex: 1 }}>
        <AndroidBackButton onPress={ () => this._hardwareBackHandler() }/>
        <NavBar
          navigator={ this.props.navigator }
          leftButtonAction={ () => this._goBack() }
        />
        <ScrollableWaitableView loaded={this.state.loaded}>
          <SceneHeading text="Take Attendance"/>
          <FormHeading text="Select Class"/>
          <View style={{
            marginLeft: 20,
            marginRight: 20
          }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              { this.buildList(this.state.centreData) }
            </View>
          </View>
        </ScrollableWaitableView>
      </View>
    )
  }

}
