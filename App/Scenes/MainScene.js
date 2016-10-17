import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'

import NavBar from '../Components/NavBar'
import Drawer from 'react-native-drawer'
import Config from '../Config'

export default class MainScene extends Component {

  constructor(props) {
      super(props)
  }

  getOpenDrawerOffset(){

  }

  render() {
    return (
      <View>
      <Drawer
        ref="drawer"
        type="overlay"
        initializeOpen={false}
        tapToClose={true}
        content={
          <View style={{height:Config.metrics.screenHeight, backgroundColor: 'green'}}>
            
            <View style={{justifyContent: 'center', alignItems: 'center', height: 100}}>
              <Text>Profile Picture</Text>
            </View>
            <View>
              <Text style={drawerStyles.menuItemText}>Centre</Text>
            </View>

            <Text style={drawerStyles.menuItemText}>Children</Text>

            <Text style={drawerStyles.menuItemText}>Classes</Text>

            <Text style={drawerStyles.menuItemText}>Staff</Text>

            <View style={drawerStyles.seperator}/>

            <Text style={drawerStyles.menuItemText}>Hello Drawer</Text>

            <Text style={drawerStyles.menuItemText}>Hello Drawer</Text>

            <Text style={drawerStyles.menuItemText}>Hello Drawer</Text>

            <Text style={drawerStyles.menuItemText}>Hello Drawer</Text>

          </View>
        }
        openDrawerOffset={ 0.3 } // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        >
          <NavBar
            navigator={ this.props.navigator }
            route={ this.props.route }
            rightButtonText="Login"
            rightButtonAction={ () => this.attempt() }
            leftButtonText="Hamburger"
            leftButtonAction={ () => this.refs.drawer.open() }
          />
          <View>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
          </View>
        </Drawer>
      </View>

    )
  }
}

const drawerStyles = {
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    backgroundColor: 'red',
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