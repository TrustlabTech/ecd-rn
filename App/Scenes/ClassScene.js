import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Scene from '../Components/Scene'
import SceneView from '../Components/SceneView'
import NavBar from '../Components/NavBar'
import FormHeading from '../Components/FormHeading'
import Button from '../Components/Button'
import Config from '../Config'
import Routes from '../Routes'
import SceneHeading from '../Components/SceneHeading'
import * as classActions from '../Actions/Class'

class ClassScene extends Component {

  constructor(props) {
    super(props)
    this.actions = this.props.actions
    this.navigator = this.props.navigator
    this.route = this.props.route
  }

  componentWillMount() {
    const token = this.props.state.App.userData._token
    const staffId = this.props.state.App.userData.user.id
    this.props.actions.fetchClasses( staffId, token )
  }

  render() {
    var items = null

    // Check if data is available yet
    if( this.props.state.App.centreData ) {

      items =
      <View style={{flex: 1, alignItems: 'center'}}>
      {this.props.state.App.centreData.map((val,i) =>
        <Button
        disabled={val.attended}
        width={250}
        key={i}
        text={val.name}
        onPress={ () => {
          this.navigator.push({
            ...Routes.attendance,
            classId: val.id,
            className: val.name,
            centreId: val.centre_id
          })
        }}
        />
      )}
      </View>
    }

    return (
      <View style={{flex: 1}}>
        <NavBar
          title="ECD APP"
          navigator={ this.navigator }
        />
        <SceneView>
          <SceneHeading text="Take Attendance"/>
          <FormHeading text="Select Class"/>
          <View style={{
            marginLeft: 20,
            marginRight: 20
          }}>
            {items}
          </View>
        </SceneView>
      </View>
    )
  }

}

export default connect(
  (state) => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(classActions,dispatch)
  })
)(ClassScene)