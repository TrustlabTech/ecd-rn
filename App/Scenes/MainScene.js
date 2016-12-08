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

import IMPLog from '../Impulse/IMPLog'


class MainScene extends IMPComponent {

  constructor(props) {
    super(props)

    this.state = {
      loaded: true,
      drawerOpen: false
    }
  }

  componentWillMount() {
    super.componentWillMount()
  }

  componentWillFocus() {
    super.componentWillFocus()
  }

  componentDidFocus() {
    super.componentDidFocus()
  }

  componentWillReceiveProps() {
    super.componentWillReceiveProps()

  }

  componentWillUnmount() {
    super.componentWillUnmount()
  }


  closeDrawer = () => {
    // Close the drawer
    this._drawer.closeDrawer()

    // make sure the modal is closed
    this.setState({drawerOpen: false})

}
  takeAttendance() {

    Sentry.addNavigationBreadcrumb(this._className, "MainScene", "ClassScene")

    this.closeDrawer()

    this.navigator.push(Routes.class)

  }

  logout() {

    // As to confirm
    Alert.alert('Logout','Are you sure you want to logout?',
      [
        {
          text: 'Yes',
          onPress: () => {

            // Go back
            this.navigator.pop()

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
    super.render()

    // Interpolate new lines into the strings
    const mainBtnText = "Take\nAttendance"
    const loggedInAs = "Logged in as\n" +
    this.props.state.App.userData.user.given_name + ' ' +
    this.props.state.App.userData.user.family_name

    // Draw the scene
    return (
      <View style={{flex: 1}}>

        <NavBar
          navigator={ this.props.navigator }
          leftButtonText="|||"
          leftButtonAction={ () => this.toggleDrawer() }
        />
        <Scene loaded={this.state.loaded}>

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
        </Scene>
      </View>
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