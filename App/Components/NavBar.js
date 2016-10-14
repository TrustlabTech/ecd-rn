import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Platform,
    TouchableHighlight
} from 'react-native'

import Config from '../Config'
import Routes from '../Routes'
import SystemBar from './SystemBar'

export default class NavBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      route: props.route,
      navigator: props.navigator
    }
    console.log('NavBarConstructor',this.state)
  }

  componentWillMount() {
    console.log('Navbar:componentWillMount')
  }

  shouldComponentUpdate(props) {
    return true;
  }

  componentDidMount() {
    console.log('Navbar:componentDidMount')
  }

  componentWillReceiveProps() {
    console.log('Navbar:componentWillReceiveProps')
  }

  pressBack() {
    this.state.navigator.pop()
  }

  canGoBack() {
      if (this.state.navigator.getCurrentRoutes().length > 1) {
          return true
      } else {
          return false
      }
  }

  render() {

    var backButton
    if (this.canGoBack()) {
      backButton =
        <TouchableHighlight
          underlayColor='silver'
          onPress={this.pressBack.bind(this) }
        >
          <View style={styles.navButtonViewWrapper}>
            <View/>
            <Text style={styles.navButtonText}>Back</Text>
            <View/>
          </View>
        </TouchableHighlight>
    } else {
      backButton =
        <View/>
    }

    var rightButton =
      <TouchableHighlight
        underlayColor='silver'
        onPress={ this.props.rightButtonAction }
      >
        <View style={styles.navButtonViewWrapper}>
          <Text style={styles.navButtonText}>{this.props.rightButtonText}</Text>
        </View>
      </TouchableHighlight>

    return (
      <View>
        <SystemBar/>
        <View style={[styles.container]}>
          {backButton}
          <View/>
          {rightButton}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: Config.metrics.navBarHeight,
        backgroundColor: '#1886BC',
    },
    titleBarBackground: {
        backgroundColor: '#cccccc',
        height: Platform.OS === 'ios' ? 20 : 0
    },
    navButtonViewWrapper: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10
    },
    navButtonText: {
      fontSize: 16,
      color: 'white'
    }
})