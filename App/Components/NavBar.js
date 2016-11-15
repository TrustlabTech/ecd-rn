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

export default class NavBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      navigator: props.navigator
    }
  }


  canGoBack() {
    return this.props.navigator.getCurrentRoutes().length > 1 ?
      true : false
  }

  goBack() {
    setTimeout(() => this.props.navigator.pop(),0 )
  }

  pressRightButton() {
    if(this.props.rightButtonAction)
      setTimeout(() => this.props.rightButtonAction(),0 )
  }

  pressLeftButton() {
    if(this.props.leftButtonAction)
      setTimeout(() => this.props.leftButtonAction(),0 )
  }

  render() {

    var leftButton, centerTitle, rightButton,  iOSSpacer = null
    let { leftButtonAction,
          leftButtonText,
          rightButtonAction,
          rightButtonText } = this.props

    if( leftButtonText ) {

      if( !leftButtonAction )
        leftButtonAction = () => alert(" No action specified")

      leftButton =
        <TouchableHighlight
          underlayColor='silver'
          onPress={ () => this.pressLeftButton() }
        >
          <View style={styles.sideButtonsViewWrapper}>
            <Text style={styles.navButtonText}>{leftButtonText}</Text>
          </View>

        </TouchableHighlight>

    } else if (this.canGoBack()) {

      let text = leftButtonText ?
        leftButtonText : "Back"

      leftButton =
        <TouchableHighlight
          underlayColor='silver'
          onPress={ () => this.goBack() }
        >
          <View style={styles.sideButtonsViewWrapper}>
            <Text style={styles.navButtonText}>{text}</Text>
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
       onPress={ () => this.pressRightButton() }
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
          height: 60,
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