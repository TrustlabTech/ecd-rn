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

  render() {
    return (
      <Navigator
        initialRoute={Routes.login}
        ref='navigator'
        // initialRouteStack={routes} // broken  https://github.com/facebook/react-native/pull/3016
        renderScene={(route, navigator) => {
          return React.createElement(
            route.component,
            {route, navigator}
          )
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