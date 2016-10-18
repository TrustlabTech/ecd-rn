import React, { Component } from 'react'
import {
  Text,
  View,
  Dimensions,
  ScrollView
} from 'react-native'

import NavBar from './NavBar'
import Drawer from 'react-native-drawer'
import Routes from '../Routes'
import DrawerMenuItem from './DrawerMenuItem'


export default class MainDrawer extends Component {

  constructor(props) {
      super(props)
  }

  render() {
    return (
      <Drawer
        ref="drawer"
        type="overlay"
        initializeOpen={false}
        tapToClose={true}
        content={
          (
            <ScrollView>
            <View style={{height:Dimensions.get('window').height, backgroundColor: 'white'}}>

            <View style={{justifyContent: 'center', alignItems: 'center', height: 200}}>
              <Text>Profile Picture</Text>
            </View>
            <DrawerMenuItem text="Centre" onPress={ () => this.props.navigator.push(Routes.centre) } />
            <DrawerMenuItem text="Children" onPress={() => this.props.navigator.push(Routes.child)} />
            <DrawerMenuItem text="Classes" onPress={() => this.props.navigator.push(Routes.class) } />
            <DrawerMenuItem text="Staff" onPress={() => this.props.navigator.push(Routes.staff) } />
            <View style={drawerStyles.seperator}/>
            <DrawerMenuItem text="Attendance" onPress={() => this.props.navigator.push(Routes.attendance)} />
            <View style={drawerStyles.seperator}/>
            <DrawerMenuItem text="Profile" onPress={ () => this.props.navigator.push(Routes.profile) } />
            <DrawerMenuItem text="Settings" onPress={ () => this.props.navigator.push(Routes.settings) } />
          </View>
          </ScrollView>
          )
        }
        openDrawerOffset={ Dimensions.get('window').width - 200 } // 30% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        >
          <this.props.route.scene route={this.props.route} navigator={this.props.navigator} leftButtonAction={ () => this.refs.drawer.open() }/>
        </Drawer>

    )
  }
}

const drawerStyles = {
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  main: {paddingLeft: 3},
  seperator: {
    height: 20
  },
  menuItem: {
    alignItems: 'center',
    padding: 5
  },
  menuItemText: {
    fontSize: 25
  }

}