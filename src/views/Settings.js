/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

'use-strict'

// base libs
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  AsyncStorage,
} from 'react-native'
// components/views
import Button from '../components/Button'
// redux actions
import { setSession } from '../actions'
// constants
import { ICONS, COLORS, AS_USERNAME } from '../constants' 
import { SID_LOGIN } from '../screens'

class Settings extends Component {
  constructor(props) {
    super(props)

    this.onLogoutPress = this.onLogoutPress.bind(this)
  }

  async onLogoutPress() {
    const username = await AsyncStorage.getItem(AS_USERNAME)
    this.props.navigator.showModal({
      title: 'Login',
      screen: SID_LOGIN,
      navigatorStyle: {
        navBarHidden: true,
        tabBarHidden: true,
      },
      passProps: {
        username: username || ''
      },
      overrideBackPress: true,
    })
    this.props.setSession()
    
    setTimeout(() => {
      this.props.navigator.switchToTab({ tabIndex: 0 })
    }, 500)
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Logout */}
        <Button style={styles.button} nativeFeedback={true} onPress={this.onLogoutPress}>
          <Text style={styles.buttonTextTitle}>Logout</Text>
          <Image source={ICONS.exitToApp12} style={styles.rowImage} />
        </Button>
      </View>
    )
  }
}
Settings.propTypes = {
  setSession: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.greyWhite,
  },
  button: {
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    borderBottomColor: COLORS.lightGrey,
  },
  buttonTextTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: COLORS.darkGrey2,
  },
  rowImage: {
    width: 12,
    height: 12,
  }
})

const mapDispatchToProps = (dispatch) => ({
  setSession: () => dispatch(setSession())
})

export default connect (null, mapDispatchToProps)(Settings)
