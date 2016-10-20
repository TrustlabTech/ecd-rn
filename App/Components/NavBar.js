import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableHighlight,
  StatusBar
} from 'react-native'
import { Colours, FontSizes } from '../GlobalStyles'
import Config from '../Config'
import Routes from '../Routes'

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

    var leftButton, centerTitle, rightButton,  iOSSpacer = null

    if( this.props.leftButtonText && this.props.leftButtonAction ) {

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
      /*
        This is a bit of a hack,
        for layout to render correctly
      */
      leftButton =
        <TouchableHighlight>
          <View style={styles.sideButtonsViewWrapper}/>
        </TouchableHighlight>
    }

    centerTitle =
      <View style={styles.centerTitleViewWrapper}>
        <Text style={[styles.navButtonText, { fontSize: FontSizes.h5 }]}>
          {this.props.title}
        </Text>
      </View>

    rightButton =
      <TouchableHighlight
       underlayColor={Colours.touchableUnderLay}
       onPress={this.props.rightButtonAction}
      >
        <View style={styles.sideButtonsViewWrapper}>
          <Text style={styles.navButtonText}>{this.props.rightButtonText}</Text>
        </View>
      </TouchableHighlight>

    if(Platform.OS === 'ios')
      iOSSpacer = <View style={{height: 20}}/>

    return (
      <View>
        <StatusBar
          backgroundColor="silver"
          barStyle="default"
        />
        { iOSSpacer }
        <View style={{
          flex:1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: Config.metrics.navBarHeight,
          backgroundColor: Colours.primary,

        }}>
          {leftButton}
          {centerTitle}
          {rightButton}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navButtonViewWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  navButtonText: {
    fontSize: FontSizes.p,
    color: Colours.lightText
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