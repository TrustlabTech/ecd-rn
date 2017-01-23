/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  StatusBar
} from 'react-native'
import { Colours, FontSizes } from '../GlobalStyles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class NavBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      navigator: props.navigator
    }
  }

  canGoBack() {
    return this.props.navigator.getCurrentRoutes().length > 1
  }

  goBack() {
    setTimeout(() => this.props.navigator.pop(), 0)
  }

  pressRightButton() {
    if (this.props.rightButtonAction) {
      setTimeout(() => this.props.rightButtonAction(), 0)
    }
  }

  pressLeftButton() {
    if (this.props.leftButtonAction) {
      setTimeout(() => this.props.leftButtonAction(), 0)
    }
  }

  render() {
    let leftButton
    let centerTitle
    let rightButton

    let { leftButtonAction,
          leftButtonText,
          leftButtonIcon,
          rightButtonAction,
          rightButtonText } = this.props


    if (leftButtonText && !leftButtonIcon) {
      if (!leftButtonAction) {
        leftButtonAction = () => alert('No action specified')
      }
      leftButton =
        (<TouchableHighlight
          underlayColor={Colours.primaryHighlight}
          activeOpacity={0.9}
          onPress={() => this.pressLeftButton()}
        >
          <View style={styles.sideButtonsViewWrapper}>
            <Text style={styles.navButtonText}>{leftButtonText}</Text>
          </View>
        </TouchableHighlight>)
    } else if (leftButtonIcon && !leftButtonText) {
      leftButton =
        (<TouchableHighlight
          underlayColor={Colours.offWhite}
          activeOpacity={0.9}
          onPress={() => this.pressLeftButton()}
        >
          <View style={styles.sideButtonsViewWrapper}>
            {leftButtonIcon}
          </View>
        </TouchableHighlight>)
    } else if (leftButtonIcon && leftButtonText) {
      leftButton =
        (<TouchableHighlight
          underlayColor={Colours.offWhite}
          activeOpacity={0.9}
          onPress={() => this.pressLeftButton()}
        >
          <View style={styles.sideButtonsViewWrapper}>
            <Text style={styles.navButtonText}>{leftButtonIcon}{leftButtonText}</Text>
          </View>
        </TouchableHighlight>)
    } else if (this.canGoBack()) {
      leftButton =
        (<TouchableHighlight
          underlayColor={Colours.offWhite}
          activeOpacity={0.9}
          onPress={() => this.goBack()}
        >
          <View style={styles.sideButtonsViewWrapper}>
            <Icon name="arrow-left" size={30} color={Colours.spierWit} />
          </View>
        </TouchableHighlight>)
    } else {
      /*
        This is a bit of a hack,
        for layout to render correctly
      */
      leftButton =
        (<TouchableHighlight>
          <View style={styles.sideButtonsViewWrapper} />
        </TouchableHighlight>)
    }

    centerTitle =
      (<View style={styles.centerTitleViewWrapper}>
        <Text style={[styles.navButtonText, { fontSize: FontSizes.h5 }]}>
          {this.props.title}
        </Text>
      </View>)

    if (rightButtonText) {
      rightButton =
        (<TouchableHighlight
          underlayColor={Colours.offWhite}
          activeOpacity={0.9}
          onPress={() => this.pressRightButton()}
        >
          <View style={styles.sideButtonsViewWrapper}>
            <Text style={styles.navButtonText}>{this.props.rightButtonText}</Text>
          </View>
        </TouchableHighlight>)
    } else {
      rightButton =
        (<TouchableHighlight>
          <View style={styles.sideButtonsViewWrapper} />
        </TouchableHighlight>)
    }


    return (
      <View>
        <StatusBar
          backgroundColor="black"
          barStyle="default"
        />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 60,
          backgroundColor: Colours.primaryDarklight
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
    margin: 10
  },
  sideButtonsViewWrapper: {
    flex: 1,
    backgroundColor: Colours.primaryDarklight,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60
  }
})

NavBar.propTypes = {
  rightButtonText: React.PropTypes.string,
  leftButtonText: React.PropTypes.string,
  title: React.PropTypes.string,
  navigator: React.PropTypes.object,
  leftButtonAction: React.PropTypes.func,
  rightButtonAction: React.PropTypes.func,
  leftButtonIcon: React.PropTypes.object
}
