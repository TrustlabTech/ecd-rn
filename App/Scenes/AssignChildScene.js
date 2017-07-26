/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import React from 'react'
import IMPComponent from '../Impulse/IMPComponent'
import AndroidBackButton from '../modules/AndroidBackButton'
import {
  Text,
  View,
  Alert,
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
export default class AssignChildScene extends IMPComponent {

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

    this.submit = this.submit.bind(this)
    this._goBack = this._goBack.bind(this)
    this.onChildSelectorChange = this.onChildSelectorChange.bind(this)
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
  _fetchData(childIndex = 0) {
    if (this.state.childrenLoaded) {
      this.setState({ classesLoaded: false })
    }
    // Fetch list of available classes
    const sessionState = Session.getState()
    Api.fetchClass(
      sessionState.userData.meta.unassignedClass[0].id,
      sessionState.userData._token
    )
    .then(data => {
      if (data.length > 0) {
        this.setState({
          loaded: true,
          unassignedChildren: data,
          childSelectedId: data[childIndex].id,
        })

        return Api.fetchClasses(
          sessionState.userData.user.id,
          sessionState.userData._token
        ).then(classes => {
          this.setState({
            classesLoaded: true,
            classes,
            classSelectedId: classes[0].id,
          })
        })
      } else {
        this.setState({ loaded: true })
      }
    })
    .catch(error => {
      // FIXME with a proper alert
      alert('There was an error fetching the classes' + error.toString())
    })
  }

  _goBack() {
    this.navigator.pop()
  }

  onChildSelectorChange(childSelectedId) {
    this.setState({ childSelectedId })    
  }

  onClassSelectorChange(classSelectedId) {
    this.setState({ classSelectedId })
  }

  submit() {
    const sessionState = Session.getState()

    Api.updateChildClass(this.state.childSelectedId, this.state.classSelectedId, sessionState.userData._token)
    .then(() => {
      ToastAndroid.show('Child successfully assigned', ToastAndroid.SHORT)
    })
    .catch(error => { // eslint-disable-line no-unused-vars
      Alert.alert(Config.errorMessage.network.title, Config.errorMessage.network.message)
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AndroidBackButton onPress={() => !!!this._goBack()} />

        <NavBar
          navigator={this.props.navigator}
          leftButtonAction={() => this._goBack()} />

        <ScrollableWaitableView loaded={this.state.loaded}>
          <SceneHeading text="Assign Child" />
          <View>

            {/* Unassigned children */}
            {
              /* Empty Unassigned class */
              this.state.unassignedChildren.length === 0 ? (
                 <Text style={{ marginLeft: 18, fontSize: FontSizes.p, color: Colours.darkText }}>
                  There are currently no unassigned children.
                </Text>
              ) : (
                <Text style={{ marginLeft: 18, fontSize: FontSizes.p, color: Colours.darkText }}>Unassigned Children</Text>
              )
            }

            {
              this.state.unassignedChildren.length > 0 && (
                <Selector
                  items={this.state.unassignedChildren}
                  selectedValue={this.state.childSelectedId}
                  onValueChange={this.onChildSelectorChange}
                  pickerLabelDataAttribute={(object) => `${object.given_name} ${object.family_name}`} />
              )
            }

            {/* Available classes */}
            {
              this.state.unassignedChildren.length === 0 ? null : (
                <Text style={{ marginLeft: 18, fontSize: FontSizes.p, color: Colours.darkText }}>Classes</Text>
              )
            }
            {
              this.state.unassignedChildren.length === 0 ? null : (
                this.state.classesLoaded ? (
                  <Selector
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
              this.state.unassignedChildren.length === 0 ? (
                <View style={{ paddingTop: 20, paddingRight: 10, flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Button text="Go back" onPress={this._goBack} />
                </View>
              ) : (
                <View style={{ paddingTop: 20, paddingRight: 10, flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Button text="Assign" onPress={this.submit} />
                </View>
              )
            }

          </View>
        </ScrollableWaitableView>

      </View>)
  }
}

AssignChildScene.propTypes = {
  navigator: React.PropTypes.object.isRequired
}
