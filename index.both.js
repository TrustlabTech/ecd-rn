import React, { Component } from 'react'
import {
    Text,
    View,
    Navigator,
    StyleSheet
} from 'react-native'
import Routes from './App/Routes'

export default class Both extends Component {

  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  componentWillMount() {
    console.log('Index:componentWillMount')
  }

  shouldComponentUpdate(props) {
    console.log('Index:shouldComponentUpdate')
    return true
  }

  componentDidMount() {
    console.log('Index:componentDidMount')
  }

  componentWillReceiveProps() {
    console.log('Index:componentWillReceiveProps')
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