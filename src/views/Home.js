/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto@novalab.io>
 */

'use-strict'

// base libs
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native'
// components / views
import List from '../components/List'
import Button from '../components/Button'
// functions
// constants
import { SCREEN_SIZE } from '../constants' 

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.renderItem = this.renderItem.bind(this)
    this.onRenderItemPress = this.onRenderItemPress.bind(this)
  }

  renderItem() {
    return (
      <Button style={styles.rowContainer} onPress={this.onRenderItemPress}>
        <Text style={styles.rowText}></Text>
        <Image style={styles.rowImage} />
      </Button>
    )
  }

  onRenderItemPress() {
    this.props.navigator.push({})
  }

  render() {
    return (
      <View style={styles.container} collapsable={true}>
        <List
          style={styles.list}
          renderItem={this.renderItem}
          data={['Class1', 'Class2', 'Class3', 'Class4']} />
      </View>
    )
  }
}
Home.propTypes = {
  //classes: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  rowContainer: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
    width: SCREEN_SIZE.width,
  },
  rowText: {
    fontSize: 18,
    fontWeight: '700',
  },
  rowImage: {
    width: 24,
    height: 24,
  },
})
