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
// components/views
import List from '../components/List'
import Button from '../components/Button'
// constants
import { ICONS, COLORS } from '../constants' 
import {
  SID_CHILD_ADD,
  SID_CHILD_ASSIGN,
  SID_CHILD_UNASSIGN,
} from '../screens'

class Manage extends Component {
  constructor(props) {
    super(props)

    this.childActions = [
      { id: 0, text: 'Create', desc: 'Create new child', navTitle: 'Create Child', navScreen: SID_CHILD_ADD },
      { id: 1, text: 'Assign', desc: 'Assign child to a class', navTitle: 'Assigning Child', navScreen: SID_CHILD_ASSIGN },
      { id: 2, text: 'Unassign', desc: 'Unassign child from a class', navTitle: 'Unassigning Child', navScreen: SID_CHILD_UNASSIGN }
    ]
  }

  renderItem = ({ item }) => (
    <Button style={styles.button} nativeFeedback={true} onPress={() => this.onRowPress(item)}>
      <View>
        <Text style={styles.buttonTextTitle}>{item.text}</Text>
        <Text style={styles.buttonTextDesc}>{item.desc}</Text>
      </View>
      <Image source={ICONS.navigateRight12} style={styles.rowImage} />
    </Button>
  )

  onRowPress(item) {
    const pushConfig = {
      title: item.navTitle,
      screen: item.navScreen,
      passProps: {
        session: this.props.session,
      }
    }

    this.props.navigator.push(pushConfig)
  }

  render() {
    return (
      <View style={styles.container}>
        <List
          style={styles.list}
          data={this.childActions}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Text style={styles.headerText}>Child</Text>} />
      </View>
    )
  }
}
Manage.propTypes = {
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
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.darkGrey2,
    
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
  buttonTextDesc: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: '200',
    color: COLORS.grey,
  },
  rowImage: {
    width: 12,
    height: 12,
  }
})

const mapStoreToProps = (store) => {
  return {
    session: store.session,
  }
}

export default connect(mapStoreToProps)(Manage)