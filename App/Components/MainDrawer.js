import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'

import NavBar from './NavBar'
import Drawer from 'react-native-drawer'
import Config from '../Config'
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
          (<View style={{height:Config.metrics.screenHeight, backgroundColor: 'white'}}>

            <View style={{justifyContent: 'center', alignItems: 'center', height: 200}}>
              <Text>Profile Picture</Text>
            </View>
            <DrawerMenuItem text="Centre" onPress={ () => alert('Test') } />
            <DrawerMenuItem text="Children" onPress={() => alert('Test')} />
            <DrawerMenuItem text="Classes" onPress={() => alert('Test')} />
            <DrawerMenuItem text="Staff" onPress={() => alert('Test')} />
            <View style={drawerStyles.seperator}/>
            <DrawerMenuItem text="Attendance" onPress={() => alert('Test')} />
            <View style={drawerStyles.seperator}/>
            <DrawerMenuItem text="Profile" onPress={() => alert('Test')} />
            <DrawerMenuItem text="Settings" onPress={() => alert('Test')} />
          </View>)
        }
        openDrawerOffset={ 0.3 } // 20% gap on the right side of drawer
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
    flexDirection: 'column'
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