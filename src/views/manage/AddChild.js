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
  Text,
  Alert,
  TextInput,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native'
// components / views
import Picker from '../../components/Picker'
import Button from '../../components/Button'
import DatePicker from 'react-native-datepicker'
// libs/functions
import Crypto from '../../libs/Crypto'
import { Request } from '../../libs/network'
// constants
import { META, COLORS, CREATE_CHILD } from '../../constants'
import Utils from '../../libs/Utils'
var luhn = require('luhn-alg')

class AddChild extends Component {
  constructor(props) {
    super(props)

    this.state = {
      citizenships: [],
      classId: -1,
      givenName: '',
      familyName: '',
      idNumber: '',
      passport: '',
      citizenshipId: -1,
      gender: '',
      race: '',
      date_of_birth: '', // eslint-disable-line camelcase
      registration_latitude: '', // eslint-disable-line camelcase
      registration_longitude: '', // eslint-disable-line camelcase
      validationErrors: {
        idNumber: '',
        givenName: '',
        familyName: '',
      },
    }

    this.createChild = this.createChild.bind(this)
    this._duplicateChild = this._duplicateChild.bind(this)

    this.onCentreSelectorChanged = this.onCentreSelectorChanged.bind(this)

    this.onGivenNameTextChanged = this.onGivenNameTextChanged.bind(this)
    this.onGivenNameEditingSubmitted = this.onGivenNameEditingSubmitted.bind(this)

    this.onFamilyNameTextChanged = this.onFamilyNameTextChanged.bind(this)
    this.onFamilyNameEditingSubmitted = this.onFamilyNameEditingSubmitted.bind(this)

    this.onIdNumberTextChanged = this.onIdNumberTextChanged.bind(this)
    this.onIdNumberEditingSubmitted = this.onIdNumberEditingSubmitted.bind(this)

    this.onPassportTextChanged = this.onPassportTextChanged.bind(this)
    this.onPassportEditingSubmitted = this.onPassportEditingSubmitted.bind(this)

    this.onCitizenshipSelectorChanged = this.onCitizenshipSelectorChanged.bind(this)
    this.onGenderSelectorChanged = this.onGenderSelectorChanged.bind(this)
    this.onRaceSelectorChanged = this.onRaceSelectorChanged.bind(this)
    this.onDateChanged = this.onDateChanged.bind(this)
  }

  componentDidMount() {
    this.getCitizenships()
  }

  getCitizenships() {
    const citizenships = META.getCitizenships()
    try {
      this.setState({ citizenships, citizenshipId: citizenships[0].id })
    } catch (e) {
      this.setState({ error: e.message })
    }
  }

  // given name
  onGivenNameTextChanged(t) {
    this.setState({
      givenName: t,
      validationErrors: { ...this.state.validationErrors, givenName: '' }
    })
  }

  onGivenNameEditingSubmitted() {
    this.familyName.focus()
  }

  // family name
  onFamilyNameTextChanged(t) {
    this.setState({
      familyName: t,
      validationErrors: { ...this.state.validationErrors, familyName: '' }
    })
  }

  onFamilyNameEditingSubmitted() {
    this.idNumber.focus()
  }

  // id number
  onIdNumberTextChanged(t) {
    this.setState({
      idNumber: t
    })

    if (t.length <= 0 && this.state.citizenshipId !== "ZA") {
      this.setState({
        validationErrors: { ...this.state.validationErrors, idNumber: '' }
      })
      return
    }

    if (t.length <= 0 && this.state.citizenshipId === "ZA") {
      this.setState({
        validationErrors: { ...this.state.validationErrors, idNumber: 'Please enter a valid ID number.' }
      })
      return
    }

    if (!luhn(t)) {
      this.setState({
        validationErrors: { ...this.state.validationErrors, idNumber: 'Please enter a valid ID number.' }
      })
      return
    } else {
      this.setState({
        validationErrors: { ...this.state.validationErrors, idNumber: '' }
      })
    }

    if (this._duplicateChild(t)) {
      this.setState({
        validationErrors: { ...this.state.validationErrors, idNumber: 'A child with this ID number is already registered' }
      })
    }

  }

  onIdNumberEditingSubmitted() {
    this.passport.focus()
  }

  onPassportTextChanged(t) {
    this.setState({
      passport: t
    })
    if (t.length <= 0 && this.state.citizenshipId !== "ZA") {
      this.setState({
        validationErrors: { ...this.state.validationErrors, passport: 'Please enter a valid passport number.' }
      })
      return
    }
    this.setState({
      validationErrors: { ...this.state.validationErrors, passport: '' }
    })

  }

  onPassportEditingSubmitted() {
    this.citizenship.focus()
  }

  onCentreSelectorChanged(classId) {
    this.setState({ classId })
  }

  onCitizenshipSelectorChanged(citizenshipId) {
    this.setState({ citizenshipId })
  }

  onGenderSelectorChanged(gender) {
    this.setState({ gender })
  }

  onRaceSelectorChanged(race) {
    this.setState({ race })
  }

  onDateChanged(dob) {
    this.setState({ date_of_birth: dob })
  }

  _duplicateChild(idNumber) {
    let children = this.props.pupils
    children = children.filter((child) => {
      return child.id_number == idNumber
    })
    return children.length > 0
  }

  async createChild() {
    let validationErrors = {}
    if (!this.state.givenName) {
      validationErrors.givenName = 'Please enter a first name.'
    }
    if (!this.state.familyName) {
      validationErrors.familyName = 'Please enter a family name.'
    }
    if (!this.state.idNumber && !this.state.passport) {
      validationErrors.idNumber = 'Please enter a valid ID number or passport'
      validationErrors.passport = 'Please enter a valid ID number or passport'
    }

    if (this._duplicateChild(this.state.idNumber)) {
      validationErrors.idNumber = 'A child with this ID number is already registered'
    }

    if (Object.keys(validationErrors).length > 0) {
      this.setState({ validationErrors: validationErrors })
      return false
    }

    if (this.state.classId === -1) {
      this.state.classId = this.class.props.items[0].id
    }

    if (this.state.citizenshipId === -1) {
      this.state.citizenshipId = this.citizenship.props.items[0].id
    }
    if (this.state.race === '') {
      this.state.race = this.race.props.items[0].id
    }

    if (this.state.gender === '') {
      this.state.gender = this.gender.props.items[0].id
    }

    if (this.state.date_of_birth === ''){
      this.state.date_of_birth = this.dob.getDateStr() // eslint-disable-line camelcase
    }


    let location = null
    try {
      location = await Utils.getCurrentPosition(navigator.geolocation)
    } catch (e) {
      this.setState({ submittingAttendance: false }, () => {
          // Alert.alert('Location unavailable', 'Your location could not be determined,\nplease ensure location is enabled.')
      })
      return false
    }
    const keypair = await Crypto.createECKeypair()
    let body = {
      given_name: this.state.givenName, // eslint-disable-line camelcase
      family_name: this.state.familyName, // eslint-disable-line camelcase
      centre_class_id: this.state.classId, // eslint-disable-line camelcase
      citizenship: this.state.citizenshipId, // eslint-disable-line camelcase
      gender: this.state.gender, // eslint-disable-line camelcase
      race: this.state.race, // eslint-disable-line camelcase
      date_of_birth: this.state.date_of_birth, // eslint-disable-line camelcase
      registration_latitude: location.coords.latitude.toString(), // eslint-disable-line camelcase
      registration_longitude: location.coords.longitude.toString(), // eslint-disable-line camelcase
      keypair,
    }

    if (this.state.idNumber !== '') {
      body.id_number = this.state.idNumber // eslint-disable-line camelcase
    }
    if (this.state.passport !== '') {
      body.passport = this.state.passport
    }



    const request = new Request()

    try {
      const
        { session } = this.props,
        { url, options } = CREATE_CHILD(session.token, body)

      await request.fetch(url, options)
      this.props.navigator.pop()
    } catch (e) {
      console.log(e)
      Alert.alert('Error', 'Failed to create child, try again later.')
    }
  }

  _class() {
    return (
      <View>
        <Text style={styles.label}>Class</Text>
        <Picker
            ref={r => this.class = r}
            style={styles.picker}
            items={this.props.classes}
            selectedValue={this.state.classId}
            onValueChange={this.onCentreSelectorChanged} />
      </View>
    )
  }

  _givenName() {
    return (
      <View>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          returnKeyType={'next'}
          style={styles.textInput}
          onChangeText={this.onGivenNameTextChanged}
          onSubmitEditing={this.onGivenNameEditingSubmitted} />
        <Text style={styles.formError}>{this.state.validationErrors.givenName}</Text>
      </View>
    )
  }

  _familyName() {
    return (
      <View>
        <Text style={styles.label}>Family Name</Text>
        <TextInput
          ref={r => this.familyName = r}
          returnKeyType={'next'}
          style={styles.textInput}
          onChangeText={this.onFamilyNameTextChanged}
          onSubmitEditing={this.onFamilyNameEditingSubmitted} />
        <Text style={styles.formError}>{this.state.validationErrors.familyName}</Text>
      </View>
    )
  }

  _idNumber() {
    if (this.state.citizenshipId !== "ZA") {
      return
    }
    return (
      <View>
        <Text style={styles.label}>ID Number</Text>
        <TextInput
          ref={r => this.idNumber = r}
          returnKeyType={'next'}
          keyboardType={'numeric'}
          style={styles.textInput}
          onChangeText={this.onIdNumberTextChanged} />
        <Text style={styles.formError}>{this.state.validationErrors.idNumber}</Text>
      </View>
    )
  }

  _passport() {
    if (this.state.citizenshipId === "ZA") {
      return
    }

    return (
      <View>
        <Text style={styles.label}>Passport</Text>
        <TextInput
          ref={r => this.passport = r}
          returnKeyType={'next'}
          keyboardType={'numeric'}
          style={styles.textInput}
          onChangeText={this.onPassportTextChanged} />
        <Text style={styles.formError}>{this.state.validationErrors.passport}</Text>
      </View>
    )
  }

  _citizenship() {
    return (
      <View>
        <Text style={styles.label}>Citizenship</Text>
        <Picker
          ref={r => this.citizenship = r}
          style={styles.picker}
          items={this.state.citizenships}
          selectedValue={this.state.citizenshipId}
          onValueChange={this.onCitizenshipSelectorChanged} />
      </View>
    )
  }

  _race() {
    return (
      <View>
        <Text style={styles.label}>Race</Text>
        <Picker
          ref={r => this.race = r}
          style={styles.picker}
          items={META.races}
          selectedValue={this.state.race}
          onValueChange={this.onRaceSelectorChanged} />
      </View>
    )
  }

  _gender() {
    return (
      <View style={styles.rowItem}>
        <Text style={styles.label}>Gender</Text>
        <Picker
          ref={r => this.gender = r}
          style={styles.picker}
          items={META.genders}
          selectedValue={this.state.gender}
          onValueChange={this.onGenderSelectorChanged} />
      </View>
    )
  }

  _dob() {
    return (
      <View style={styles.rowItem}>
        <Text style={styles.label}>Date of Birth</Text>
        <DatePicker
          ref={r => this.dob = r}
          style={styles.picker}
          mode="date"
          format="YYYY-MM-DD"
          date="2010-01-01"
          minDate="2010-01-01"
          maxDate="2016-01-01"
          onDateChange={this.onDateChanged} />
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.ScrollView} contentContainerStyle={styles.container} keyboardShouldPersistTaps={'handled'} >
        {this._class()}
        {this._givenName()}
        {this._familyName()}
        {this._citizenship()}
        {this._idNumber()}
        {this._passport()}
        {this._race()}
        <View style={styles.rowContainer}>
          {this._gender()}
          {this._dob()}
        </View>

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
  classes: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
  },
  container: {
    padding: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.greyWhite,
  },
  label: {
    fontSize: 14,
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
    marginTop: 0,
  },
  rowContainer: {
    flexDirection: 'row'
  },
  rowItem: {
    flex: 1,
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

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const mapStoreToProps = (store) => {
  return {
    session: store.session,
    pupils: store.pupils,
    classes: store.classes,
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(AddChild)
