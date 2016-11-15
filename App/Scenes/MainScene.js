import React, { Component } from 'react'
import {
  Text,
  View,
  Dimensions,
  Image,
  StatusBar,
  ScrollView,
  TouchableHighlight,
  DrawerLayoutAndroid
} from 'react-native'

import NavBar from '../Components/NavBar'
import Button from '../Components/Button'
import Routes from '../Routes'
import Scene from '../Components/Scene'
import SceneView from '../Components/SceneView'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as mainActions from '../Actions/Main'
import * as appActions from '../Actions/App'
import * as navigationActions from '../Actions/Navigation'
import MainDrawer from '../Components/MainDrawer'
import { Colours, FontSizes } from '../GlobalStyles'
import { ModalMode } from '../Components/WaitModal'

class MainScene extends Component {

  constructor(props) {
    super(props)
    this.drawerOpen = false
    // For future terseness
    this.actions = this.props.actions
    this.navigator = this.props.navigator
    this.route = this.props.route
  }

  takeAttendance() {
    setTimeout(() => this.navigator.push(Routes.class),0)
    this._drawer.closeDrawer()
  }

  logout() {
    this.props.dispatch(appActions.setModal({
      modalVisible: true,
      modalMode: ModalMode.CONFIRM,
      modalText: "Are you sure you want to logout?",
      modalOnPositive: () => {
        setTimeout(() => this.props.navigator.pop() ,0)
        // Delay for better animation
        setTimeout(() => this._drawer.closeDrawer() ,100)
    }}))
  }

  toggleDrawer() {
    if(this.drawerOpen) {
      this._drawer.closeDrawer()
      this.drawerOpen = false
    } else {
      this._drawer.openDrawer()
      this.drawerOpen = true
    }
  }

  render() {
    // This ensures the newline is interpolated
    let mainBtnText = "Take\nAttendance"
    let loggedInAs = "Logged in as\n" +
      this.props.state.App.userData.user.given_name + ' ' +
      this.props.state.App.userData.user.family_name
    const onPs = function(){ alert('hi') }
    return (
        <View style={{flex: 1}}>
          <NavBar
            title="ECD APP"
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
                    <TouchableHighlight onPress={ () => alert("Press the 'Take Attendance' button to take today's attendance") }>
                      <Text style={{fontSize: FontSizes.h4, color: Colours.offWhite, paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>Help & Instructions</Text>
                    </TouchableHighlight>
                  </View>

                  <View>
                    <TouchableHighlight onPress={ () => this.logout }>
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