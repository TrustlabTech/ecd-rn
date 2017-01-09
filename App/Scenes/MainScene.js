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
  TouchableHighlight,
  DrawerLayoutAndroid,
  Alert,
  StyleSheet
} from 'react-native'

import Api from '../Api'
import Config from '../Config'
import Sentry from '../Sentry'
import Session from '../Session'
import Routes from '../Routes'
import { Colours, FontSizes } from '../GlobalStyles'

import NavBar from '../Components/NavBar'
import ScrollableWaitableView from '../Components/ScrollableWaitableView'
import SceneHeading from '../Components/SceneHeading'
import Button from '../Components/Button'

/**
 * The main scene of the application show after login
 * @augments IMPComponent
 */
export default class MainScene extends IMPComponent {

  /** @constructor */
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

  /**
   * Fetch server data needed to render the page
   * @returns {undefined}
   */
  _fetchData() {

    const centre_id = this.props.route.user.centre_id
    const token = this.props.route.token
    Api.fetchCentreSummary(centre_id,token)

    .then( (data) => {
      this.setState({
        loaded: true,
        summaryData: data
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

  /**
   * Closes the drawer
   * @returns undefined
   */
  _hardwareBackHandler() {
    this._logout()
    return true
  }

  /**
   * Closes the drawer
   * @returns {undefined}
   */
  _closeDrawer() {
    if(this.state.loaded) {
      this._drawer.closeDrawer()
      this.setState({drawerOpen: false})
    }
  }

  /**
   * Opens the drawer
   * @returns {undefined}
   */
  _openDrawer() {
    if(this.state.loaded) {
      this._drawer.openDrawer()
      this.setState({drawerOpen: true})
    }
  }
  /**
   * Open the drawer if it is closed, close the drawer if it is open.
   * @returns {undefined}
   */
  _toggleDrawer() {
    if(this.state.drawerOpen) {
      this._closeDrawer()

    } else {
      this._openDrawer()
    }
  }

  /**
   * Navigate to ClassScene.
   * @returns {undefined}
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

  _goToAddChildScene() {
    Sentry.addNavigationBreadcrumb(this._className, "MainScene", "AddChildScene")
    this._closeDrawer()
    this.navigator.push(Routes.addChild)
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
        <AndroidBackButton onPress={ () => this._hardwareBackHandler() }/>
        <NavBar
          navigator={ this.props.navigator }
          leftButtonText="|||"
          leftButtonAction={ () => this._toggleDrawer() }
        />

          <DrawerLayoutAndroid
            onDrawerOpen={ () => this.setState({drawerOpen: true }) }
            onDrawerClose={ () => this.setState({drawerOpen: false }) }
            drawerWidth={250}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            ref={(ref) => this._drawer = ref}
            renderNavigationView= { () =>

              <View style={{flex: 1, backgroundColor: Colours.primary}}>

                  <Text style={ss.menuTitleText}>Menu</Text>
                  <View style={ss.menuItemWrapperView}/>

                  <View>
                    <TouchableHighlight onPress={ () => this._drawer.closeDrawer() }>
                      <Text style={ss.menuItemText}>Home</Text>
                    </TouchableHighlight>
                  </View>

                  <View>
                    <TouchableHighlight onPress={ () => this._goToClassScene() }>
                      <Text style={ss.menuItemText}>Take Attendance</Text>
                    </TouchableHighlight>
                  </View>

                  <View>
                    <TouchableHighlight onPress={ () => this._goToHistoryScene() }>
                      <Text style={ss.menuItemText}>Attendance History</Text>
                    </TouchableHighlight>
                  </View>

                  <View>
                    <TouchableHighlight onPress={ () => this._goToAddChildScene() }>
                      <Text style={ss.menuItemText}>Add Child</Text>
                    </TouchableHighlight>
                  </View>

                  <View style={ss.menuItemWrapperView}/>

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
                    <TouchableHighlight onPress={ () => this._logout() }>
                      <Text style={ss.menuItemText}>Logout</Text>
                    </TouchableHighlight>
                  </View>

              </View>
            }
          >
            <ScrollableWaitableView loaded={this.state.loaded}>
              <View style={ss.mainViewWrapper}>
                <SceneHeading text={ Session.getState().userData.user.centre.name }/>
                <Text style={[ss.loggedInAsText,{color: Colours.darkText}]}>{loggedInAs}</Text>
                <Text style={[ss.loggedInAsText,{color: Colours.darkText}]}>Classes: {numClasses}</Text>
                <Text style={[ss.loggedInAsText,{color: Colours.darkText}]}>Children: {numChildren}</Text>
                <Button
                  text={mainBtnText}
                  onPress={ () => this._goToClassScene() }
                  width={250}
                  height={80}
                />
                <Button
                  text={historyBtnText}
                  onPress={ () => this._goToHistoryScene() }
                  width={250}
                  height={80}
                />
                <Button
                  text="Add Child"
                  onPress={ () => this._goToAddChildScene() }
                  width={250}
                  height={50}
                />
              </View>

              <View style={{padding: 20}}>
                <Button text="Logout" onPress={ () => this._logout() }/>
              </View>
            </ScrollableWaitableView>
          </DrawerLayoutAndroid>
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