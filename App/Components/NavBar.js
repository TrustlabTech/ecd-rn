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
  }


  canGoBack() {
    return this.props.navigator.getCurrentRoutes().length > 1 ?
      true : false
  }

  render() {

    var leftButton
    if( this.props.leftButtonText &&
        this.props.leftButtonAction){
      leftButton =
      <TouchableHighlight
        underlayColor='silver'
        onPress={ this.props.leftButtonAction }
      >
        <View style={styles.sideButtonsViewWrapper}>
          <Text style={styles.navButtonText}>{this.props.leftButtonText}</Text>
        </View>
      </TouchableHighlight>
    } else if (this.canGoBack()) {
      leftButton =
        <TouchableHighlight
          underlayColor='silver'
          onPress={ this.props.navigator.pop }
        >
          <View style={styles.sideButtonsViewWrapper}>
            <Text style={styles.navButtonText}>Back</Text>
          </View>
        </TouchableHighlight>
    } else {
      {/* This is a bit of a hack,
        for layout to render correctly */}
      leftButton =
        <TouchableHighlight>
          <View style={styles.sideButtonsViewWrapper}/>
        </TouchableHighlight>
    }

    var centerTitle =
      <View style={styles.centerTitleViewWrapper}>
        <Text style={[styles.navButtonText, { fontSize: 22 }]}>
          {this.props.title}
        </Text>
      </View>

    var rightButton =
      <TouchableHighlight
       underlayColor='silver'
       onPress={this.props.rightButtonAction}
      >
        <View style={styles.sideButtonsViewWrapper}>
          <Text style={styles.navButtonText}>{this.props.rightButtonText}</Text>
        </View>
      </TouchableHighlight>

    return (
      <View>
        <SystemBar/>
        <View style={[styles.container]}>
          {leftButton}
          {centerTitle}
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
  },
  centerTitleViewWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  sideButtonsViewWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 50
  }
})