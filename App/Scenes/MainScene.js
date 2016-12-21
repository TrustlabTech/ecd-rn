/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import IMPComponent from '../Impulse/IMPComponent'

import {
  Text,
  View,
  TouchableHighlight,
  DrawerLayoutAndroid,
  BackAndroid,
  Alert,
  StyleSheet
} from 'react-native'

import Api from '../Api'
import Config from '../Config'
import Sentry from '../Sentry'
import NavBar from '../Components/NavBar'
import Button from '../Components/Button'
import Routes from '../Routes'
import { Colours, FontSizes } from '../GlobalStyles'
import Scene from '../Components/Scene'
import IMPLog from '../Impulse/IMPLog'
import Session from '../Session'

export default class MainScene extends IMPComponent {


  constructor(props) {
    super(props)

    this.state = {
      loaded: false,     // Nothing to fetch
      drawerOpen: false,
      summaryData: null
    }
  }

  componentDidFocus() {
    super.componentDidFocus()
    /**
     * We must use didFocus because login is not complete on willMount.
     * We don't need didMount because then the page will be initialised
     * twice
     */

    this._fetchData()
  }

  componentDidMount() {
    super.componentDidMount()
    // BackAndroid.addEventListener('hardwareBackPress', () => this._hardwareBackHandler())
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    console.log('unmounting listener')
    // BackAndroid.removeEventListener('hardwareBackPress', () => this._hardwareBackHandler())
  }

  _fetchData() {

    const centre_id = this.props.route.user.centre_id
    const token = this.props.route.token
    Api.fetchCentreSummary(centre_id,token)

    .then( (data) => {
      // IMPLog.networkResponse(data.status, new Date(),data._bodyText)
      this.setState({
        loaded: true,
        summaryData: data
      })
    })

    .catch( (error) => {
      alert(error)
    })

  }


  _hardwareBackHandler() {
    console.log('Hardware back handler')
    this._logout()
    return true
  }

  /**
   * Closes the drawer
   */
  _closeDrawer() {

    // Close the drawer
    this._drawer.closeDrawer()

    // update state
    this.setState({drawerOpen: false})
  }

  /**
   * Open the drawer if it is closed, close the drawer if it is open.
   */
  _toggleDrawer() {
    if(this.state.drawerOpen) {

      // Close draw
      this._closeDrawer()

    } else {

      // Open drawer
      this._drawer.openDrawer()

      // Update state
      this.setState({drawerOpen: true})

    }
  }

  /**
   * Navigate to ClassScene.
   */
  _goToClassScene() {

    Sentry.addNavigationBreadcrumb(this._className, "MainScene", "ClassScene")

    this._closeDrawer()
    this.navigator.push(Routes.class)
    this.setState({
      loaded: false,
      summaryData: null
    })
  }

  _goToHistoryScene() {
    Sentry.addNavigationBreadcrumb(this._className, "MainScene", "HistoryScene")
    this._closeDrawer()
    this.navigator.push(Routes.history)
    this.setState({
      loaded: false,
      summaryData: null
    })


  }

  /**
   * Log the current user out and return to the login screen.
   */
  _logout() {

    // Ask to confirm
    Alert.alert('Logout','Are you sure you want to logout?',
      [
        {
          text: 'Yes',
          onPress: () => {
            this.setState({loaded: false})
            this.navigator.pop()
          }
        },
        { text: 'No'}
      ]
    )
  }


  render() {
    super.render()

    // Interpolate new lines into the strings
    const mainBtnText = "Take\nAttendance"
    const historyBtnText = "View Attendance\nHistory"
    const loggedInAs = `Logged in as ${this.props.route.user.given_name} ${this.props.route.user.family_name}`
    const numClasses = this.state.summaryData ? this.state.summaryData.classes : 0
    const numChildren = this.state.summaryData ? this.state.summaryData.children : 0
    // Draw the scene
    return (
      <View style={{flex: 1}}>

        <NavBar
          navigator={ this.props.navigator }
          leftButtonText="|||"
          leftButtonAction={ () => this._toggleDrawer()}
        />
        <Scene loaded={this.state.loaded}>

          <DrawerLayoutAndroid
            onDrawerOpen={ () => this.setState({drawerOpen: true })}
            onDrawerClose={ () => this.setState({drawerOpen: false })}
            drawerWidth={250}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            ref={(ref) => this._drawer = ref}
            renderNavigationView= { () =>

              <View style={{flex: 1, backgroundColor: Colours.primary}}>

                  <Text style={ss.menuTitleText}>Menu</Text>
                  <View style={ss.menuItemWrapperView}/>

                  <View>
                    <TouchableHighlight onPress={ () => this._drawer.closeDrawer()}>
                      <Text style={ss.menuItemText}>Home</Text>
                    </TouchableHighlight>
                  </View>

                  <View>
                    <TouchableHighlight onPress={ () => {
                      Alert.alert(
                        'Help & Instructions',
                        'Press the Take Attendance button to take today\'s attendance',
                        [{text: 'Okay'}]
                      )
                    }}>
                      <Text style={ss.menuItemText}>Help & Instructions</Text>
                    </TouchableHighlight>
                  </View>

                  <View>
                    <TouchableHighlight onPress={ () => this._logout()}>
                      <Text style={ss.menuItemText}>Logout</Text>
                    </TouchableHighlight>
                  </View>

              </View>
            }
          >
            <View style={ss.mainViewWrapper}>
              <Text style={[ss.loggedInAsText,{color: Colours.darkText}]}>{loggedInAs}</Text>
              <Text style={[ss.loggedInAsText,{color: Colours.darkText}]}>Classes: {numClasses}</Text>
              <Text style={[ss.loggedInAsText,{color: Colours.darkText}]}>Children: {numChildren}</Text>
              <Button
                text={mainBtnText}
                onPress={ () => this._goToClassScene()}
                width={250}
                height={100}
              />
              <Button
                text={historyBtnText}
                onPress={ () => this._goToHistoryScene()}
                width={250}
                height={100}
              />
            </View>

            <View style={{padding: 20}}>
              <Button text="Log Out" onPress={ () => this._logout()}/>
            </View>

          </DrawerLayoutAndroid>
        </Scene>
      </View>
    )
  }
}

const ss = StyleSheet.create({
  loggedInAsText: {
    padding: 5,
    fontSize: FontSizes.p,
    color: Colours.offWhite
  },
  menuTitleText : {
    fontSize: FontSizes.h6,
    color: Colours.offWhite,
    padding: 5,
    marginLeft: 2,
    marginTop: 5
  },
  menuItemWrapperView: {
    height: 2,
    backgroundColor: Colours.secondary,
    marginLeft: 5,
    marginRight: 20,
    marginBottom: 5
  },
  menuItemText: {
    fontSize: FontSizes.h4,
    color: Colours.offWhite,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  },
  mainViewWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

})