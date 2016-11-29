/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  DrawerLayoutAndroid,
  Alert
} from 'react-native'

import Config from '../Config'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Sentry from '../Sentry'
import NavBar from '../Components/NavBar'
import Button from '../Components/Button'
import Routes from '../Routes'
import Api from '../Api'
import { Colours, FontSizes } from '../GlobalStyles'
import { ModalMode } from '../Components/WaitModal'
import Scene from '../Components/Scene'
import * as mainActions from '../Actions/Main'
import * as appActions from '../Actions/App'



class MainScene extends Component {

  FILENAME = 'MainScene.js'

  constructor(props) {

    super(props)
    this.state = {
      drawerOpen: false
    }
  }

  componentWillMount() {

    if(Config.debug)
      console.log(this.FILENAME,'componentWillMount')
    else
      Sentry.addBreadcrumb(this.FILENAME,'componentWillMount')
  }

  takeAttendance() {

    Sentry.addNavigationBreadcrumb(this.FILENAME+"::takeAttendance()", "MainScene", "ClassScene")

    // Close the drawer
    this._drawer.closeDrawer()

    // Keep track of it's state
    this.setState({drawerOpen: false})

    // Open the modal
    this.props.dispatch(appActions.setModal({
      modalVisible: true,
      modalText: "Please wait",
      modalMode: ModalMode.WAITING
    }))

    // Fetch remote data
    Api.fetchClasses(
      this.props.state.App.userData.user.id,
      this.props.state.App.userData._token
    ).then((data) => {

      // Handle result
      if(data.error) {

        // Close the modal
        this.props.dispatch(appActions.setModal({
          modalVisible: false
        }))

        // Handle error
        if(Config.debug) {
          alert(data.error)
          console.log(data.error)
        } else {
          Sentry.captureEvent(data.error, this.FILENAME)
          Alert.alert(
            'Network Error',
            Config.errorMessage.NETWORK,
            [
              {text: "Okay"}
            ]
          )
        }

      } else {

        // Change scene
        this.props.navigator.push(Routes.class)

        // Push cntre data into app store
        this.props.dispatch(appActions.setCentre(data))

        // Close the modal
        this.props.dispatch(appActions.setModal({
          modalVisible: false
        }))
      }

    // Catch any rejections
    }).catch((error) => {

      // Close the modal
      this.props.dispatch(appActions.setModal({
        modalVisible: false
      }))

      // Display the error
      if(Config.debug) {
        alert(error)
        console.log(error.stack)
      } else {
        Sentry.captureEvent(error.stack, this.FILENAME)

        Alert.alert(
          'Unknown Error',
          Config.errorMessage.NETWORK,
          [
            {text: "Okay"}
          ]
        )


      }

    })
  }

  logout() {

    // As to confirm
    Alert.alert('Logout','Are you sure you want to logout?',
      [
        {
          text: 'Yes',
          onPress: () => {

            // Go back
            this.props.navigator.pop()

            // Close drawer
            this._drawer.closeDrawer()

            // Close modal
            this.setState({drawerOpen: false})
          }
        },
        {
          text: 'No'
        }
      ]
    )
  }

  toggleDrawer() {
    if(this.drawerOpen) {

      // Close draw
      this._drawer.closeDrawer()

      // Update state
      this.setState({drawerOpen: false})

    } else {

      // Open drawer
      this._drawer.openDrawer()

      // Update state
      this.setState({drawerOpen: true})

    }
  }

  render() {
    // Interpolate new lines into the strings
    const mainBtnText = "Take\nAttendance"
    const loggedInAs = "Logged in as\n" +
      this.props.state.App.userData.user.given_name + ' ' +
      this.props.state.App.userData.user.family_name

    // Draw the scene
    return (
      <Scene>
        <View style={{flex: 1}}>

          <NavBar
            navigator={ this.props.navigator }
            leftButtonText="|||"
            leftButtonAction={ () => this.toggleDrawer() }
          />

          <DrawerLayoutAndroid
            onDrawerOpen={ () => this.drawerOpen = true }
            onDrawerClose={ () => this.drawerOpen = false }
            drawerWidth={250}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView= { () =>
              <View style={{flex: 1, backgroundColor: Colours.primary}}>
                <View>
                  <Text style={{padding: 5, fontSize: FontSizes.p, color: Colours.offWhite}}>{loggedInAs}</Text>
                  <Text style={{fontSize: FontSizes.h6, color: Colours.offWhite, padding: 5, marginLeft: 2, marginTop: 5}}>Menu</Text>
                  <View style={{height: 2, backgroundColor: Colours.secondary, marginLeft: 5, marginRight: 20, marginBottom: 5 }}/>

                  <View>
                    <TouchableHighlight onPress={ () => this._drawer.closeDrawer()  }>
                      <Text style={{fontSize: FontSizes.h4, color: Colours.offWhite, paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>Home</Text>
                    </TouchableHighlight>
                  </View>

                  <View>
                    <TouchableHighlight onPress={ () => {
                      Alert.alert('Help & Instructions','Press the Take Attendance button to take today\'s attendance',
                      [
                        {text: 'Okay'}
                      ])
                    }}>
                      <Text style={{fontSize: FontSizes.h4, color: Colours.offWhite, paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>Help & Instructions</Text>
                    </TouchableHighlight>
                  </View>

                  <View>
                    <TouchableHighlight onPress={ () => this.logout() }>
                      <Text style={{fontSize: FontSizes.h4, color: Colours.offWhite, paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>Logout</Text>
                    </TouchableHighlight>
                  </View>

                </View>
              </View>
            }
            ref={(ref) => this._drawer = ref}
          >

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

              <Button
                text={mainBtnText}
                onPress={() => this.takeAttendance()}
                width={250}
                height={100}
              />

            </View>

            <View style={{padding: 20}}>

              <Button
                text="Log Out"
                onPress={() => this.logout() }
              />

            </View>

          </DrawerLayoutAndroid>
        </View>
      </Scene>
    )
  }
}

export default connect(
  (state) => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(mainActions,dispatch)
  })
)(MainScene)