/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import React from 'react'
import IMPComponent from '../Impulse/IMPComponent'
import AndroidBackButton from 'react-native-android-back-button'
import {
  Text,
  View,
  Alert,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
  InteractionManager
} from 'react-native'

import Config from '../Config'
import { FontSizes, Colours } from '../GlobalStyles'
import Api from '../Api'
import Session from '../Session'

import {
  ScrollableWaitableView,
  SceneHeading,
  NavBar,
  Button,
  Selector
} from '../Components'

/**
 * A scene for adding children to the centre
 * @extends IMPComponent
 */
export default class UnassignChildScene extends IMPComponent {

  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      classData: [],
      children: [],
      childrenLoaded: false,
      classSelectedId: null,
      childSelectedId: null,
    }

    this.unassign = this.unassign.bind(this)
    this.graduate = this.graduate.bind(this)
    this.onClassSelectorChange = this.onClassSelectorChange.bind(this)
  }

  componentDidMount() {
    this._fetchData()
  }

  /**
   * Fetch server data needed to render the page
   * @memberof AddChildScene
   * @returns {undefined}
   */
  _fetchData(classIndex = 0) {
    if (this.state.childrenLoaded) {
      this.setState({ childrenLoaded: false })
    }
    // Fetch list of available classes
    const sessionState = Session.getState()
    Api.fetchClasses(
      sessionState.userData.user.id,
      sessionState.userData._token
    )
    .then(data => {
      this.setState({
        loaded: true,
        classData: data,
        classSelectedId: data[classIndex].id,
      })

      return Api.fetchClass(
        data[classIndex].id,
        sessionState.userData._token
      )
    })
    .then(childrenData => {
      this.setState({
        childrenLoaded: true,
        children: childrenData,
        childSelectedId: childrenData[0].id
      })
    })
    .catch(error => {
      // FIXME with a proper alert
      alert('There was an error fetching the classes' + error.toString())
    })
  }

  _hardwareBackHandler() {
    this._goBack()
    return true
  }

  _goBack() {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        this.navigator.pop()
        this.setState({
          loaded: false
        })
      }, 100)
    })
  }

  onClassSelectorChange(classId) {
    classId = parseInt(classId)
    const classIndex = this.state.classData.findIndex(f => f.id === classId)
    this.setState({ classSelectedId: classId }, () => {
      this._fetchData(classIndex)
    })
  }

  unassign() {
    this.submit(sessionState.userData.meta.unassignedClass[0].id)
  }

  graduate() {
    this.submit(sessionState.userData.meta.graduatedClass[0].id)
  }

  submit(classId) {
    const sessionState = Session.getState()

    Api.updateChildClass(this.state.childSelectedId, classId, sessionState.userData._token)
    .then(response => {
      if (response.ok)
        ToastAndroid.show('Child successfully modified', ToastAndroid.SHORT)
      else
        Alert.alert('Error', 'An error occurrend, try again later. If the problem persist, please contact an admin.')
    })
    .catch(error => { // eslint-disable-line no-unused-vars
      Alert.alert(Config.errorMessage.network.title, Config.errorMessage.network.message)
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AndroidBackButton onPress={() => this._hardwareBackHandler()} />

        <NavBar
          navigator={this.props.navigator}
          leftButtonAction={() => this._goBack()} />

        <ScrollableWaitableView loaded={this.state.loaded}>
          <SceneHeading text="Unassign Child" />
          <View>

            {/* Class */}
            <Text style={{ marginLeft: 18, fontSize: FontSizes.p, color: Colours.darkText }}>Class</Text>
            <Selector
              selectedValue={this.state.classSelectedId}
              onValueChange={this.onClassSelectorChange}
              items={this.state.classData} />
            {/* Children */}
            <Text style={{ marginLeft: 18, fontSize: FontSizes.p, color: Colours.darkText }}>Children</Text>
            {
              this.state.childrenLoaded ? (
                <Selector
                  items={this.state.children}
                  selectedValue={this.state.childSelectedId}
                  onValueChange={childSelectedId => this.setState({ childSelectedId: childSelectedId })}
                  pickerLabelDataAttribute={(object) => `${object.given_name} ${object.family_name}`} />
              ) : (
                <ActivityIndicator
                  animating
                  style={{ height: 60, alignSelf: 'center' }}
                  size="large" />
              )
            }

            <View style={styles.buttonToolbar}>
              <Button text="Unassign" onPress={this.unassign} />
              <Button text="Graduate" onPress={this.graduate} />
            </View>

          </View>
        </ScrollableWaitableView>

      </View>)
  }
}

UnassignChildScene.propTypes = {
  navigator: React.PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  buttonToolbar: {
    flex: 1,
    marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width,
  }
})
