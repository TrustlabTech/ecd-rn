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
  TouchableNativeFeedback,
  DrawerLayoutAndroid,
  Alert,
  StyleSheet,
  InteractionManager
} from 'react-native'
import { Colours, FontSizes } from '../GlobalStyles'

import Api from '../Api'
import Config from '../Config'
import Session from '../Session'
import Sentry from '../Sentry'
import Routes from '../Routes'
import {
  NavBar,
  ScrollableWaitableView,
  SceneHeading,
  Button
} from '../Components'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

/**
 * The main scene of the application show after login
 * @extends IMPComponent
 */
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

  /**
   * Fetch server data needed to render the page
   * @memberof MainScene
   * @returns {undefined}
   */
  _fetchData() {
    const centreId = this.props.route.user.centre_id
    const token = this.props.route.token
    Api.fetchCentreSummary(centreId, token)

    .then(data => {
      setTimeout(() => {
        this.setState({
          loaded: true,
          summaryData: data
        })
      }, Config.sceneTransitionMinumumTime)
    })

    .catch(error => {
      if (Config.debug) {
        IMPLog.error(error.toString(), this._fileName)
      }
      Alert.alert(
        Config.errorMessage.network.title,
        Config.errorMessage.network.message,
        [{ text: 'Okay' }]
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
    if (this.state.loaded) {
      this._drawer.closeDrawer()
      this.setState({ drawerOpen: false })
    }
  }

  /**
   * Opens the drawer
   * @returns {undefined}
   */
  _openDrawer() {
    if (this.state.loaded) {
      this._drawer.openDrawer()
      this.setState({ drawerOpen: true })
    }
  }
  /**
   * Open the drawer if it is closed, close the drawer if it is open.
   * @returns {undefined}
   */
  _toggleDrawer() {
    if (this.state.drawerOpen) {
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
    this.navigator.push(Routes.class)
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        loaded: false,
        summaryData: null
      })
      this._closeDrawer()
      Sentry.addNavigationBreadcrumb(this._className, "MainScene", "ClassScene")
    })
  }

  _goToHistoryScene() {
    this.navigator.push(Routes.history)
    InteractionManager.runAfterInteractions(() => {
      this._closeDrawer()
      this.setState({
        loaded: false,
        summaryData: null
      })
      Sentry.addNavigationBreadcrumb(this._className, "MainScene", "HistoryScene")
    })
  }

  _goToAddChildScene() {
    this.navigator.push(Routes.addChild)
    InteractionManager.runAfterInteractions(() => {
      Sentry.addNavigationBreadcrumb(this._className, "MainScene", "AddChildScene")
      this._closeDrawer()
      this.setState({
        loaded: false,
        summaryData: null
      })
    })
  }

  /**
   * Log the current user out and return to the login screen.
   */
  _logout() {
    // Ask to confirm
    Alert.alert('Logout', 'Are you sure you want to logout?',
      [
        {
          text: 'Yes',
          onPress: () => {
            this.setState({ loaded: false })
            this.navigator.pop()
          }
        },
        { text: 'No' }
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
      <View style={{ flex: 1 }}>
        <AndroidBackButton onPress={() => this._hardwareBackHandler()} />
        <NavBar
          navigator={this.props.navigator}
          leftButtonIcon={<Icon name="menu" size={30} color={Colours.spierWit} />}
          leftButtonAction={() => this._toggleDrawer()}
        />
        <DrawerLayoutAndroid
          onDrawerOpen={() => this.setState({ drawerOpen: true })}
          onDrawerClose={() => this.setState({ drawerOpen: false })}
          drawerWidth={250}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          ref={(ref) => { this._drawer = ref }}
          renderNavigationView={() =>

            <View style={{ flex: 1, backgroundColor: Colours.primaryDarklight }}>

              <Text style={ss.menuTitleText}>Menu</Text>
              <View style={ss.menuItemWrapperView} />

              <View>
                <TouchableNativeFeedback onPress={() => this._drawer.closeDrawer()}>
                  <View>
                    <Text style={ss.menuItemText}><Icon name="home" color={Colours.spierWit} size={26} /> Home</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>

              <View>
                <TouchableNativeFeedback onPress={() => this._goToClassScene()}>
                  <View>
                    <Text style={ss.menuItemText}><Icon name="playlist-check" color={Colours.spierWit} size={26} /> Take Attendance</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>

              <View>
                <TouchableNativeFeedback onPress={() => this._goToHistoryScene()}>
                  <View>
                    <Text style={ss.menuItemText}><Icon name="history" color={Colours.spierWit} size={26} /> Attendance History</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>

              <View>
                <TouchableNativeFeedback onPress={() => this._goToAddChildScene()}>
                  <View>
                    <Text style={ss.menuItemText}><Icon name="account-plus" color={Colours.spierWit} size={26} /> Add Child</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>

              <View style={ss.menuItemWrapperView} />

              <View>
                <TouchableNativeFeedback onPress={() => {
                  Alert.alert(
                    'Help & Instructions',
                    'Press the Take Attendance button to take today\'s attendance',
                    [{ text: 'Okay' }]
                  )
                }}>
                  <View>
                    <Text style={ss.menuItemText}><Icon name="help-circle" color={Colours.lightText} size={26}/> Help & Instructions</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>

              <View>
                <TouchableNativeFeedback onPress={() => this._logout()}>
                  <View>
                    <Text style={ss.menuItemText}><Icon name="logout" color={Colours.lightText} size={26} /> Logout</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          }
        >
          <ScrollableWaitableView loaded={this.state.loaded}>
            <SceneHeading text={Session.getState().userData.user.centre.name} />
            <View style={{ flex: 1, flexDirection: 'column', paddingLeft: 20, paddingRight: 20 }}>
              <Text style={[ss.loggedInAsText, { color: Colours.darkText }]}>{loggedInAs}</Text>
              <Text style={[ss.loggedInAsText, { color: Colours.darkText }]}>Classes: {numClasses}</Text>
              <Text style={[ss.loggedInAsText, { color: Colours.darkText }]}>Children: {numChildren}</Text>
            </View>
            <View style={ss.mainViewWrapper}>
              <Button
                text={mainBtnText}
                onPress={() => this._goToClassScene()}
                width={280}
                height={80}
              />
              <Button
                text={historyBtnText}
                onPress={() => this._goToHistoryScene()}
                width={280}
                height={80}
              />
              <Button
                text="Add Child"
                onPress={() => this._goToAddChildScene()}
                width={280}
                height={50}
              />
            </View>

            <View style={{ padding: 20 }}>
              <Button text="Logout" onPress={() => this._logout()} />
            </View>
          </ScrollableWaitableView>
        </DrawerLayoutAndroid>
      </View>
    )
  }
}

const ss = StyleSheet.create({
  menuTitleText: {
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
    fontSize: FontSizes.h5,
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
