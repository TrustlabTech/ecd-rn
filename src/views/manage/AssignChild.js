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
import { COLORS, GET_CLASSES, GET_CHILDREN, UPDATE_CHILD_CLASS } from '../../constants'

export default class AssignChild extends Component {
  constructor(props) {
    super(props)

    this.state = {
      classes: [],
      loaded: false,
      classesLoaded: false,
      classSelectedId: null,
      childSelectedId: null,
      unassignedChildren: [],
    }

    this.updateChildClass = this.updateChildClass.bind(this)
    this.onChildSelectorChange = this.onChildSelectorChange.bind(this)
    this.onClassSelectorChange = this.onClassSelectorChange.bind(this)
  }

  componentDidMount() {
    this.fetchData()
  }

  async fetchData() {
    const children = await this.getUnassignedChildren()
    if (children !== false) {
      this.setState({
        // children stuff
        loaded: true,
        unassignedChildren: children,
        childSelectedId: children[0].id,
      })
      const classes = await this.getAvailableClasses()
      if (classes !== false) {
        this.setState({
          // classes stuff
          classes,
          classesLoaded: true,
          classSelectedId: classes[0].id,
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

  async getUnassignedChildren() {
    const
      { session } = this.props,
      { url, options } = GET_CHILDREN(session.token, session.meta.unassignedClass[0].id),
      request = new Request()

    try {
      return await request.fetch(url, options)
    } catch (e) {
      this.setState({ loaded: true, classesLoaded: true, classes: [], unassignedChildren: [] }, () => {
        Alert.alert('Error', 'Failed to get unassigned children, try again later.')
      })
      return false
    }
  }

  onChildSelectorChange(childSelectedId) {
    if (this.state.childSelectedId === childSelectedId)
      return

    this.setState({ childSelectedId })
  }

  onClassSelectorChange(classSelectedId) {
    if (this.state.classSelectedId === classSelectedId)
      return
    
    this.setState({ classSelectedId })
  }

  async updateChildClass() {
    const
      request = new Request(),
      { session } = this.props,
      { childSelectedId } = this.state,
      { url, options } = UPDATE_CHILD_CLASS(session.token, childSelectedId, { centre_class_id: this.state.classSelectedId }) // eslint-disable-line camelcase
    
    try {
      await request.fetch(url, options)
      ToastAndroid.show('Child class updated successfully', ToastAndroid.SHORT)
      // update unassigned children
      this.fetchData()
    } catch (e) {
      console.log(e) // eslint-disable-line no-console
      Alert.alert('Error', 'Failed to update child class, try again later.')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          /* Empty Unassigned class */
          this.state.unassignedChildren.length === 0 ? (
            this.state.loaded && (<Text style={styles.label}>There are currently no unassigned children.</Text>)
          ) : (
            <Text style={styles.label}>Unassigned Children</Text>
          )
        }

        {
          this.state.unassignedChildren.length > 0 && (
            <Picker
              items={this.state.unassignedChildren}
              selectedValue={this.state.childSelectedId}
              onValueChange={this.onChildSelectorChange}
              pickerLabelDataAttribute={(object) => `${object.given_name} ${object.family_name}`} />
          )
        }

        {/* Available classes */}
        {
          this.state.unassignedChildren.length === 0 ? null : (
            <Text style={styles.label}>Classes</Text>
          )
        }
        {
          this.state.unassignedChildren.length === 0 ? null : (
            this.state.classesLoaded ? (
              <Picker
                items={this.state.classes}
                selectedValue={this.state.classSelectedId}
                onValueChange={this.onClassSelectorChange} />
            ) : (
              <ActivityIndicator
                animating
                style={{ height: 60, alignSelf: 'center' }}
                size="large" />
            )
          )
        }

        {
          this.state.unassignedChildren.length > 0 && (
            <Button style={styles.button} onPress={this.updateChildClass}>
              <Text style={styles.buttonText}>Assign</Text>
            </Button>
          )
        }
      </View>
    )
  }
}
AssignChild.propTypes = {
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
    marginTop: 10,
  },
  button: {
    bottom: 20,
    borderRadius: 8,
    paddingVertical: 8,
    alignSelf: 'center',
    position: 'absolute',
    paddingHorizontal: 50,
    backgroundColor: COLORS.brandFirst,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  }
})
