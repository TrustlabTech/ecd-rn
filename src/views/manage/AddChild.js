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
  Text,
  Alert,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native'
// components / views
import Picker from '../../components/Picker'
import Button from '../../components/Button'
// libs/functions
import Crypto from '../../libs/Crypto'
import { Request } from '../../libs/network'
// constants
import { COLORS, GET_CLASSES, CREATE_CHILD } from '../../constants'

export default class AddChild extends Component {
  constructor(props) {
    super(props)

    this.state = {
      classes: [],
      idNumber: '',
      classId: -1,
      givenName: '',
      familyName: '',
      validationErrors: {
        idNumber: '',
        givenName: '',
        familyName: '',
      },
    }

    this.createChild = this.createChild.bind(this)

    this.onIdNumberTextChanged = this.onIdNumberTextChanged.bind(this)
    this.onGivenNameTextChanged = this.onGivenNameTextChanged.bind(this)
    this.onFamilyNameTextChanged = this.onFamilyNameTextChanged.bind(this)

    this.onCentreSelectorChanged = this.onCentreSelectorChanged.bind(this)

    this.onGivenNameEditingSubmitted = this.onGivenNameEditingSubmitted.bind(this)
    this.onFamilyNameEditingSubmitted = this.onFamilyNameEditingSubmitted.bind(this)
  }

  componentDidMount() {
    this.getClasses()
  }

  // TODO: put classes in store and pass through props
  async getClasses() {
    const
      { session } = this.props,
      { url, options } = GET_CLASSES(session.token, session.user.id),
      request = new Request()
    
    try {
      const classes = await request.fetch(url, options)
      this.setState({ classes, classId: classes[0].id })
    } catch (e) {
      this.setState({ error: e.message })
    }
  }

  // given name
  onGivenNameTextChanged(t) {
    this.setState({ givenName: t, validationErrors: { ...this.state.validationErrors, givenName: '' } })
  }
  onGivenNameEditingSubmitted() {
    this.familyName.focus()
  }

  // family name
  onFamilyNameTextChanged(t) {
    this.setState({ familyName: t, validationErrors: { ...this.state.validationErrors, familyName: '' } })
  }
  onFamilyNameEditingSubmitted() {
    this.idNumber.focus()
  }

  // id number
  onIdNumberTextChanged(t) {
    this.setState({ idNumber: t, validationErrors: { ...this.state.validationErrors, idNumber: '' } })
  }

  onCentreSelectorChanged(classId) {
    this.setState({ classId })
  }

  async createChild() {
    let validationErrors = {}
    if (!this.state.givenName)
      validationErrors.givenName = 'Please enter a first name.'
    if (!this.state.familyName)
      validationErrors.familyName = 'Please enter a family name.'
    if (!this.state.idNumber)
      validationErrors.idNumber = 'Please enter an ID number.'

    if (Object.keys(validationErrors).length > 0) {
      this.setState({ validationErrors: validationErrors })
      return false
    }

    const request = new Request()

    try {
      const
        keypair = await Crypto.createECKeypair(),
        { session } = this.props,
        { url, options } = CREATE_CHILD(session.token, {
          given_name: this.state.givenName, // eslint-disable-line camelcase
          family_name: this.state.familyName, // eslint-disable-line camelcase
          id_number: this.state.idNumber, // eslint-disable-line camelcase
          centre_class_id: this.state.classId, // eslint-disable-line camelcase
          keypair,
        })

      await request.fetch(url, options)
      this.props.navigator.pop()
    } catch (e) {
      console.log(e)
      Alert.alert('Error', 'Failed to create child, try again later.')
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={'handled'} >
        {/* Class */}
        <Text style={styles.label}>Class</Text>
        <Picker
          style={styles.picker}
          items={this.state.classes}
          selectedValue={this.state.classId}
          onValueChange={this.onCentreSelectorChanged} />
        {/* Given Name */}
        <Text style={styles.label}>First Name</Text>
        <TextInput
          returnKeyType={'next'}
          style={styles.textInput}
          onChangeText={this.onGivenNameTextChanged}
          onSubmitEditing={this.onGivenNameEditingSubmitted} />
        <Text style={styles.formError}>{this.state.validationErrors.givenName}</Text>
        {/* Family Name */}
        <Text style={styles.label}>Family Name</Text>
        <TextInput
          ref={r => this.familyName = r}
          returnKeyType={'next'}
          style={styles.textInput}
          onChangeText={this.onFamilyNameTextChanged}
          onSubmitEditing={this.onFamilyNameEditingSubmitted} />
        <Text style={styles.formError}>{this.state.validationErrors.familyName}</Text>
        {/* ID Number*/}
        <Text style={styles.label}>ID Number</Text>
        <TextInput
          ref={r => this.idNumber = r}
          returnKeyType={'done'}
          keyboardType={'numeric'}
          style={styles.textInput}
          onChangeText={this.onIdNumberTextChanged} />
        <Text style={styles.formError}>{this.state.validationErrors.idNumber}</Text>

        <Button style={styles.button} onPress={this.createChild} nativeFeedback={true}>
          <Text style={styles.buttonText}>Create</Text>
        </Button>
      </ScrollView>
    )
  }
}
AddChild.propTypes = {
  session: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.greyWhite,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: '200',
    color: COLORS.darkGrey2
  },
  textInput: {
    height: 50,
    fontSize: 18,
    color: COLORS.darkGreyd
  },
  formError: {
    fontSize: 12,
    color: COLORS.red,
  },
  picker: {
    marginTop: 10,
  },
  button: {
    marginTop: 40,
    borderRadius: 8,
    paddingVertical: 8,
    alignSelf: 'center',
    paddingHorizontal: 50,
    backgroundColor: COLORS.brandFirst,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  }
})
