/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

'use-strict'

// base libs
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native'
// components / views
import Picker from '../../components/Picker'
import Button from '../../components/Button'
// libs/functions
import { Request } from '../../libs/network'
// constants
import { COLORS, SCREEN_SIZE, GET_CLASSES, GET_CHILDREN, UPDATE_CHILD_CLASS } from '../../constants'

export default class UnassignChild extends Component {
  constructor(props) {
    super(props)

    this.state = {
      classes: [],
      children: [],
      loaded: false,
      childrenLoaded: false,
      classSelectedId: null,
      childSelectedId: null,
    }

    this.updateChildClass = this.updateChildClass.bind(this)
    this.onChildSelectorChange = this.onChildSelectorChange.bind(this)
    this.onClassSelectorChange = this.onClassSelectorChange.bind(this)
  }

  componentDidMount() {
    this.fetchData()
  }

  async fetchData(classIndex = 0) {
    if (this.state.childrenLoaded) {
      this.setState({ childrenLoaded: false })
    }

    const classes = await this.getAvailableClasses()
    if (classes !== false) {
      this.setState({
        // classes stuff
        classes,
        loaded: true,
        classSelectedId: classes[classIndex].id,
      })
      const children = Utils.getChildrenForClass(classes[classIndex].id, this.props)
      if (children !== false) {
        this.setState({
          // children stuff
          children,
          childrenLoaded: true,
          childSelectedId: children[0].id,
        })
      }
    }
  }

  // TODO: put classes in store and pass through props
  async getAvailableClasses() {
    const
      { session } = this.props,
      { url, options } = GET_CLASSES(session.token, session.user.id),
      request = new Request()

    try {
      return await request.fetch(url, options)
    } catch (e) {
      this.setState({ loaded: true, classesLoaded: true, classes: [], unassignedChildren: [] }, () => {
        Alert.alert('Error', 'Failed to get available classes, try again later.')
      })
      return false
    }
  }

  onClassSelectorChange(classSelectedId) {
    if (this.state.classSelectedId === classSelectedId)
      return

    const classIndex = this.state.classes.findIndex(f => f.id === classSelectedId)
    this.setState({ classSelectedId }, () => {
      this.fetchData(classIndex)
    })
  }

  onChildSelectorChange(childSelectedId) {
    if (this.state.childSelectedId === childSelectedId)
      return

    this.setState({ childSelectedId })
  }

  async updateChildClass(type) {
    const
      request = new Request(),
      { session } = this.props,
      { childSelectedId } = this.state,
      body = {
        centre_class_id: type === 'unassign' ? session.meta.unassignedClass[0].id : session.meta.graduatedClass[0].id // eslint-disable-line camelcase
      },
      { url, options } = UPDATE_CHILD_CLASS(session.token, childSelectedId, body)

    try {
      await request.fetch(url, options)
      ToastAndroid.show('Child class updated successfully', ToastAndroid.SHORT)
      // update children
      const classIndex = this.state.classes.findIndex(f => f.id === this.state.classSelectedId)
      this.fetchData(classIndex)
    } catch (e) {
      console.log(e) // eslint-disable-line no-console
      Alert.alert('Error', 'Failed to update child class, try again later.')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Class */}
        <Text style={styles.label}>Class</Text>
        <Picker
          style={styles.picker}
          items={this.state.classes}
          selectedValue={this.state.classSelectedId}
          onValueChange={this.onClassSelectorChange} />
        {/* Children */}
        <Text style={styles.label}>Children</Text>
        {
          this.state.childrenLoaded ? (
            <Picker
              style={styles.picker}
              items={this.state.children}
              selectedValue={this.state.childSelectedId}
              onValueChange={this.onChildSelectorChange}
              pickerLabelDataAttribute={(object) => `${object.given_name} ${object.family_name}`} />
          ) : (
              <ActivityIndicator
                animating
                size="large"
                style={styles.activityIndicator} />
            )
        }

        <View style={styles.buttonToolbar}>
          <Button style={styles.button} onPress={() => this.updateChildClass('unassign')}><Text style={styles.buttonText}>Unassign</Text></Button>
          <Button style={styles.button} onPress={() => this.updateChildClass('graduate')}><Text style={styles.buttonText}>Graduate</Text></Button>
        </View>
      </View>
    )
  }
}
UnassignChild.propTypes = {
  session: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.greyWhite,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: '200',
    color: COLORS.darkGrey2
  },
  picker: {
  },
  activityIndicator: {
    height: 60,
    alignSelf: 'center',
  },
  buttonToolbar: {
    flex: 1,
    bottom: 20,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SCREEN_SIZE.width - 20 * 2,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 50,
    backgroundColor: COLORS.brandFirst,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
})
