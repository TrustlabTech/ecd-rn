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
} from 'react-native'
// components / views
import List from '../components/List'
import Button from '../components/Button'
// libs/functions
import { Request } from '../libs/network'
// constants
import { SID_HISTORY_LIST } from '../screens'
import { ICONS, COLORS } from '../constants'
import Utils from '../libs/Utils'

class History extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: '',
    }

    this.renderItem = this.renderItem.bind(this)
    this.onRenderItemPress = this.onRenderItemPress.bind(this)
  }

  renderItem({ item }) {
    return (
      <Button
        nativeFeedback={true}
        style={styles.rowContainer}
        onPress={() => this.onRenderItemPress(item)}>
        <Text style={styles.rowTextTitle}>{item.name}</Text>
        <Image source={ICONS.navigateRight12} style={styles.rowImage} />
      </Button>
    )
  }

  onRenderItemPress(item) {
    this.props.navigator.push({
      title: item.name,
      screen: SID_HISTORY_LIST,
      passProps: {
        classId: item.id,
        className: item.name,
        session: this.props.session,
      }
    })
  }

  render() {
    return (
      <View style={styles.container} collapsable={true}>
        <List
          style={styles.list}
          data={this.props.classes}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Text style={styles.headerText}>Classes</Text>} />
      </View>
    )
  }
}
History.propTypes = {
  session: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.greyWhite,
  },
  list: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  rowContainer: {
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    borderBottomColor: COLORS.lightGrey,
  },
  rowTextTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: COLORS.darkGrey2,
  },
  rowImage: {
    width: 12,
    height: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.darkGrey2,
  },
})

const mapStoreToProps = (store) => {
  return {
    session: store.session,
    classes: store.classes,
  }
}

export default connect(mapStoreToProps)(History)
