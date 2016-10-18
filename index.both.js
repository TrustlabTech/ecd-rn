import React, { Component } from 'react'
import {
    Text,
    View,
    Navigator,
    StyleSheet
} from 'react-native'
import Routes from './App/Routes'
import Orientation from 'react-native-orientation'

export default class Both extends Component {

  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  _orientationDidChange(orientation) {
    if (orientation == 'LANDSCAPE') {
      //do something with landscape layout
      console.log('LANDSCAPE')
    } else {
      //do something with portrait layout
      console.log('PORTRAIT')
    }
  }

  componentWillMount() {
    //The getOrientation method is async. It happens sometimes that
    //you need the orientation at the moment the js starts running on device.
    //getInitialOrientation returns directly because its a constant set at the
    //beginning of the js code.
    var initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      console.log('PORTRAIT')

      //do stuff
    } else {
      console.log('LANDSCAPE')

      //do other stuff
    }
  }

  componentDidMount(){
    console.log('Component did mount')
    //Orientation.lockToPortrait(); this will lock the view to Portrait
    //Orientation.lockToLandscape(); //this will lock the view to Landscape
    Orientation.unlockAllOrientations(); //this will unlock the view to all Orientations

    Orientation.addOrientationListener(this._orientationDidChange);
  }

  componentWillUnmount(){
    Orientation.getOrientation((err,orientation)=> {
      console.log("Current Device Orientation: ", orientation);
    });
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  createScene(route, navigator) {
    return React.createElement(
      route.component,
      {route, navigator}
    )
  }

  createDrawer(route, navigator) {
    return React.createElement(
      route.drawer,
      {route, navigator}
    )
  }

  render() {
    return (

        <Navigator
          onLayout={this._onLayout}
          initialRoute={Routes.login}
          ref='navigator'
          renderScene={ (route, navigator) => {

            if(route.drawer !== null) {
              return React.createElement(
                route.drawer,
                {route, navigator}
              )
            } else {
              return React.createElement(
                route.scene,
                {route, navigator}
              )
            }
          }}
          />
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});